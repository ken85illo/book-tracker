using BookTracker.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookTracker.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Book> Books { get; set; }
}
