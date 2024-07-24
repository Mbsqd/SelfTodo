namespace SelfTodo.Server.Models
{
	public class Note
	{
		public Note(string title, string text, DateTime dateEnd, int userId) 
		{
			Title = title;
			Text = text;
			IsCompleted = false;
			DateCreated = DateTime.UtcNow;
			DateEnd = dateEnd;
			UserId = userId;
		}

		public int Id { get; set; }
		public string Title { get; set; }
		public string Text { get; set; }
		public bool IsCompleted { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateEnd { get; set; }

		public int UserId { get; set; }
		public User? User { get; set; }
	}
}
