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
    public class PublishersController : Controller
    {
        private readonly LibraryContext _context;

        public PublishersController(LibraryContext context)
        {
            _context = context;
            // Если в таблице ничего не лежит то добавляем туда информацию
            if (_context.Publisher.Count() == 0)
            {
                _context.Publisher.Add(new Publisher { Id = 0, 
                                                       Name = "Издательство Питер", 
                                                       Scale = "Большая", 
                                                       SpecializationOnTheTypeOfLiterature = "Множественная" });
         
                _context.SaveChanges();
            }
        }


        [HttpGet]
        public IEnumerable<Publisher> GetAllPublishers()
        {
            return _context.Publisher;
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetPublisher([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Publisher.SingleOrDefaultAsync(m => m.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Publisher item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Publisher.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPublisher", new { id = item.Id }, item);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Publisher enty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Publisher.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            // Устанавливаем такие значения для изменённой строки
            item.Name = enty.Name;
            item.Scale = enty.Scale;
            item.SpecializationOnTheTypeOfLiterature = enty.SpecializationOnTheTypeOfLiterature;

            _context.Publisher.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Publisher.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Publisher.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
