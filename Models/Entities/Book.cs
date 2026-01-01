namespace BookTracker.Models.Entities;

public class Book
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int Year { get; set; } = 0;
    public int TotalPages { get; set; } = 0;
    public int PagesRead { get; set; } = 0;
    public string Description { get; set; } = string.Empty;
}
