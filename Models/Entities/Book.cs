namespace BookTracker.Models.Entities;

public class Book
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public int Year { get; set; }
    public int TotalPages { get; set; }
    public int PagesRead { get; set; }
    public string? Description { get; set; }
    public bool Finished { get; set; }
}
