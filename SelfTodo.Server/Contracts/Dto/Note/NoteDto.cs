namespace SelfTodo.Server.Contracts.Dto.Note
{
	public class NoteDto
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Text { get; set; } = string.Empty;
		public bool IsCompleted { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateEnd { get; set; }
	}
}
