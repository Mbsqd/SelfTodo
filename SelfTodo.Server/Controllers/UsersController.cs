using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SelfTodo.Server.Contracts.Dto.User;
using SelfTodo.Server.Contracts.Request_response;
using SelfTodo.Server.DataAccess;
using SelfTodo.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SelfTodo.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UsersController : Controller
	{
		private readonly AppDbContext _dbContext;
		private readonly IConfiguration _configuration;

		public UsersController(AppDbContext dbContext, IConfiguration configuration)
		{
			_dbContext = dbContext;
			_configuration = configuration;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterUserRequest request, CancellationToken ct) 
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (await _dbContext.Users.AnyAsync(u => u.Email == request.Email, ct)) 
			{
				return StatusCode(400, new { message = "User with this email already exist" });
			}
			else if (await _dbContext.Users.AnyAsync(u => u.Username == request.Username, ct))
			{
				return StatusCode(400, new { message = "User with this login already exist" });
			}

			var user = new User(request.Username, request.Email, BCrypt.Net.BCrypt.HashPassword(request.Password));
			await _dbContext.Users.AddAsync(user, ct);
			await _dbContext.SaveChangesAsync(ct);

			var userDto = new UserDto { Username = user.Username, Email = user.Email };
			return Ok(userDto);
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginUserRequest request, CancellationToken ct)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == request.Email);
			if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
			{
				return StatusCode(403, new { message = "Invalid email or password" });
			}

			var token = GenerateJwtToken(user);
			return Ok(new { Token = token, Username = user.Username });
		}

		private string GenerateJwtToken(User user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var keyString = _configuration["Jwt:Key"];
			if (string.IsNullOrEmpty(keyString))
			{
				throw new InvalidOperationException("JWT Key is not configured");
			}
			var key = Encoding.ASCII.GetBytes(keyString);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
					new Claim(ClaimTypes.Email, user.Email)
				}),
				Expires = DateTime.UtcNow.AddMinutes(60),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
