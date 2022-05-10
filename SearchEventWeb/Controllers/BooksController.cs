using SerachEventWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb.Controllers
{
    // Стандартный контроллер

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Book> GetAllBooks()
        {
            return _context.Book.Include(p => p.Author).Include(c => c.Genre).Include(d => d.Publisher); 
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Book.SingleOrDefaultAsync(m => m.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Book item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Book.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = item.Id }, item);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Book enty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Book.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            // Устанавливаем такие значения для изменённой строки
            // FK не требуют изменения
            item.Name = enty.Name;
            item.NomOfEdition = enty.NomOfEdition;
            item.NumberOfPages = enty.NumberOfPages;

            _context.Book.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Book.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Book.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
