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
    public class AuthorsController : Controller
    {
        private readonly LibraryContext _context;

        public AuthorsController(LibraryContext context)
        {
            _context = context;
            // Если в таблице ничего не лежит то добавляем туда информацию
            if (_context.Author.Count() == 0)
            {
                _context.Author.Add(new Author { Id = 0, Name = "Jake", Surname = "VanderPlas" });

                _context.SaveChanges();
            }
        }


        [HttpGet]
        public IEnumerable<Author> GetAllAuthors()
        {
            return _context.Author;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Author.SingleOrDefaultAsync(m => m.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Author item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Author.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthor", new { id = item.Id }, item);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Author enty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Author.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            // Устанавливаем такие значения для изменённой строки (будем изменять только имя)
            item.Name = enty.Name;

            _context.Author.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Author.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Author.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
