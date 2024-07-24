using Microsoft.EntityFrameworkCore;
using SelfTodo.Server.Models;

namespace SelfTodo.Server.DataAccess
{
	public class AppDbContext : DbContext 
	{
		private readonly IConfiguration _configuration;
		public AppDbContext(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public DbSet<User> Users => Set<User>();
		public DbSet<Note> Notes => Set<Note>();

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
		}
	}
}
