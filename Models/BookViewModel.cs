using BookTracker.Models.Entities;

namespace BookTracker.Models;

public class BookViewModel
{
    // GET Method
    public List<Book> Books { get; set; } = [];

    // POST Method
    public Book NewBook { get; set; } =
        new Book
        {
            Id = Guid.Empty,
            Title = string.Empty,
            Author = string.Empty,
        };
}
