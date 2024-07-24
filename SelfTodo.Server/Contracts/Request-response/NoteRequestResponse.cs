using SelfTodo.Server.Contracts.Dto.Note;

namespace SelfTodo.Server.Contracts.Request_response
{
	public class CreateNoteRequest
	{
		public string Title { get; set; } = string.Empty;
		public string Text { get; set; } = string.Empty;
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
		public string Title { get; set; } = string.Empty;
		public string Text { get; set; } = string.Empty;
		public bool IsCompleted { get; set; }
	}
}
