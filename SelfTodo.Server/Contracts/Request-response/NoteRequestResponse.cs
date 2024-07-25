using SelfTodo.Server.Contracts.Dto.Note;
using System.ComponentModel.DataAnnotations;

namespace SelfTodo.Server.Contracts.Request_response
{
	public class CreateNoteRequest
	{
		[Required(ErrorMessage = "Title is required")]
		[MaxLength(45, ErrorMessage = "Title must be less than 45 characters")]
		public string Title { get; set; } = string.Empty;

		[Required(ErrorMessage = "Text is required")]
		[MaxLength(450, ErrorMessage = "Text must be less than 450 characters")]
		public string Text { get; set; } = string.Empty;

		[Required(ErrorMessage = "End time is required.")]
		[DataType(DataType.DateTime, ErrorMessage = "DateEnd must be a valid date.")]
		public DateTime DateEnd { get; set; }
	}

	public class GetNotesRequest
	{
		public string? SortSearch { get; set; } = string.Empty;
		public string? SortStatus { get; set; } = string.Empty;
	}

	public class GetNotesResponse
	{
		public List<NoteDto> notes { get; set; } = new List<NoteDto>();
	}

	public class UpdateNoteRequest
	{
		[Required(ErrorMessage = "Title is required")]
		[MaxLength(45, ErrorMessage = "Title must be less than 45 characters")]
		public string Title { get; set; } = string.Empty;

		[Required(ErrorMessage = "Text is required")]
		[MaxLength(450, ErrorMessage = "Text must be less than 450 characters")]
		public string Text { get; set; } = string.Empty;
		public bool IsCompleted { get; set; }
	}

	public class UpdateNoteResponse
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Text { get; set; } = string.Empty;
		public bool IsCompleted { get; set; }
	}
}
