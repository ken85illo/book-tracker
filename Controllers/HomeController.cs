using System.Diagnostics;
using BookTracker.Data;
using BookTracker.Models;
using BookTracker.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookTracker.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public HomeController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> Index(Guid? editId = null)
    {
        Book? bookToEdit = null;

        if (editId.HasValue) //Edit
        {
            var book = await _dbContext.Books.FindAsync(editId.Value);
            if (book != null)
            {
                bookToEdit = new Book
                {
                    Id = book.Id,
                    Title = book.Title,
                    Author = book.Author,
                    Year = book.Year,
                    TotalPages = book.TotalPages,
                    PagesRead = book.PagesRead,
                    Description = book.Description,
                };
            }
        }

        var viewModel = new BookViewModel
        {
            Books = await _dbContext.Books.ToListAsync(),
            NewBook = bookToEdit ?? new Book(),
        };

        return View(viewModel);
    }

    [HttpGet]
    public async Task<IActionResult> GetBook(Guid id)
    {
        var book = await _dbContext.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        // Pass json to site.js
        return Json(
            new
            {
                id = book.Id,
                title = book.Title,
                author = book.Author,
                year = book.Year,
                totalPages = book.TotalPages,
                pagesRead = book.PagesRead,
                description = book.Description,
            }
        );
    }

    [HttpPost]
    public async Task<IActionResult> Index(BookViewModel viewModel)
    {
        if (viewModel.NewBook == null)
            return BadRequest();

        if (viewModel.NewBook.Id != Guid.Empty) // Edit
        {
            var book = await _dbContext.Books.FindAsync(viewModel.NewBook.Id);
            if (book != null)
            {
                book.Title = viewModel.NewBook.Title;
                book.Author = viewModel.NewBook.Author;
                book.Year = viewModel.NewBook.Year;
                book.TotalPages = viewModel.NewBook.TotalPages;
                book.PagesRead = viewModel.NewBook.PagesRead;
                book.Description = viewModel.NewBook.Description;

                await _dbContext.SaveChangesAsync();
            }
        }
        else // Add
        {
            var book = new Book
            {
                Title = viewModel.NewBook.Title,
                Author = viewModel.NewBook.Author,
                Year = viewModel.NewBook.Year,
                TotalPages = viewModel.NewBook.TotalPages,
                PagesRead = viewModel.NewBook.PagesRead,
                Description = viewModel.NewBook.Description,
            };

            await _dbContext.Books.AddAsync(book);
            await _dbContext.SaveChangesAsync();
        }

        return Json(new { success = true });
    }

    public async Task<IActionResult> Delete(Guid id)
    {
        var book = await _dbContext.Books.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

        if (book is not null)
        {
            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();
        }

        return RedirectToAction("Index");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(
            new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier }
        );
    }
}
