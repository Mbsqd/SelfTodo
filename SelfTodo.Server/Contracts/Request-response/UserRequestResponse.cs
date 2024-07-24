using System.ComponentModel.DataAnnotations;

namespace SelfTodo.Server.Contracts.Request_response
{
	public class RegisterUserRequest
	{
		[Required(ErrorMessage = "Username is required.")]
		[RegularExpression(@"[a-zA-Z0-9]*$", ErrorMessage = "Username can only contain letters and numbers.")]
		public string Username { get; set; } = string.Empty;

		[Required(ErrorMessage = "Email is required.")]
		[EmailAddress(ErrorMessage = "Invalid email address.")]
		public string Email { get; set; } = string.Empty;

		[Required(ErrorMessage = "Password is required.")]
		[MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
		public string Password { get; set; } = string.Empty;
	}

	public class LoginUserRequest
	{
		[Required(ErrorMessage = "Email is required.")]
		[EmailAddress(ErrorMessage = "Invalid email address.")]
		public string Email { get; set; } = string.Empty;

		[Required(ErrorMessage = "Password is required.")]
		[MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
		public string Password { get; set; } = string.Empty;
	}
}
