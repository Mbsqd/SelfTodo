using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SelfTodo.Server.Contracts.Dto.Note;
using SelfTodo.Server.Contracts.Request_response;
using SelfTodo.Server.DataAccess;
using SelfTodo.Server.Models;
using System.Security.Claims;

namespace SelfTodo.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class NotesController : Controller
	{
		private readonly AppDbContext _dbContext;
		public NotesController(AppDbContext context)
		{
			_dbContext = context;
		}

		[HttpPost]
		public async Task<IActionResult> CreateNote([FromBody] CreateNoteRequest request, CancellationToken ct)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
			var note = new Note(request.Title, request.Text, request.DateEnd, userId);
			await _dbContext.Notes.AddAsync(note, ct);
			await _dbContext.SaveChangesAsync(ct);
			var noteDto = new NoteDto { Id = note.Id, Title = note.Title, Text = note.Text, IsCompleted = note.IsCompleted, DateCreated = note.DateCreated, DateEnd = note.DateEnd };
			return Ok(noteDto);
		}

		[HttpGet]
		public async Task<IActionResult> GetNotes([FromQuery] GetNotesRequest request, CancellationToken ct)
		{
			var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
			var notesQuery = _dbContext.Notes.Where(n => n.UserId == userId).AsQueryable();

			if (!string.IsNullOrWhiteSpace(request.SortSearch))
			{
				notesQuery = notesQuery.Where(n => n.Title.ToLower().Contains(request.SortSearch.ToLower()));
			}

			if (!string.IsNullOrWhiteSpace(request.SortStatus))
			{
				notesQuery = request.SortStatus.ToLower() switch
				{
					"active" => notesQuery.Where(n => !n.IsCompleted),
					"done" => notesQuery.Where(n => n.IsCompleted),
					_ => notesQuery
				};
			}

			var noteDtos = await notesQuery
				.Select(n => new NoteDto { Id = n.Id, Title = n.Title, Text = n.Text, IsCompleted = n.IsCompleted, DateCreated = n.DateCreated, DateEnd = n.DateEnd })
				.ToListAsync(ct);

			return Ok(new GetNotesResponse { notes = noteDtos });
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateNote(int id, [FromBody] UpdateNoteRequest request, CancellationToken ct)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
			var NoteToUpdate = await _dbContext.Notes.SingleOrDefaultAsync(n => n.Id == id && n.UserId == userId, ct);
			if (NoteToUpdate == null)
			{
				return StatusCode(404, "Note not found");
			}

			NoteToUpdate.Title = request.Title;
			NoteToUpdate.Text = request.Text;
			NoteToUpdate.IsCompleted = request.IsCompleted;

			_dbContext.Notes.Update(NoteToUpdate);
			await _dbContext.SaveChangesAsync(ct);

			return Ok(new UpdateNoteResponse 
			{
				Id = NoteToUpdate.Id,
				Title = NoteToUpdate.Title, 
				Text = NoteToUpdate.Text,
				IsCompleted = NoteToUpdate.IsCompleted
			});
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteNote(int id, CancellationToken ct)
		{
			var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
			var NoteToDelete = await _dbContext.Notes.SingleOrDefaultAsync(n => n.Id == id && n.UserId == userId, ct);
			if (NoteToDelete == null)
			{
				return StatusCode(404, "Note not found");
			}
			_dbContext.Notes.Remove(NoteToDelete);
			await _dbContext.SaveChangesAsync(ct);

			return Ok( new { message = "Note removed" });
		}
	}
}
