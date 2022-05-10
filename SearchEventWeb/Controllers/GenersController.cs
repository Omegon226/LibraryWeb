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
    public class GenersController : Controller
    {
        private readonly LibraryContext _context;

        public GenersController(LibraryContext context)
        {
            _context = context;
            // Если в таблице ничего не лежит то добавляем туда информацию
            if (_context.Genre.Count() == 0)
            {
                _context.Genre.Add(new Genre { Id = 0, NameOfGenre = "Техническая литература" });

                _context.SaveChanges();
            }
        }


        [HttpGet]
        public IEnumerable<Genre> GetAllGenres()
        {
            return _context.Genre;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenre([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Genre.SingleOrDefaultAsync(m => m.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Genre item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Genre.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGenre", new { id = item.Id }, item);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Genre enty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Genre.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            // Устанавливаем такие значения для изменённой строки
            item.NameOfGenre = enty.NameOfGenre;

            _context.Genre.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Genre.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Genre.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
