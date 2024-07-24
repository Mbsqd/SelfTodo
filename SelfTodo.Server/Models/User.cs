namespace SelfTodo.Server.Models
{
	public class User
	{
		public User(string username, string email, string password) 
		{
			Username = username;
			Email = email;
			Password = password;
		}

		public int Id { get; set; }
		public string Username { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }

		public List<Note> Notes { get; set; } = new();
	}
}
