using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace SerachEventWeb.Models
{
    // Таблица справочников жанров книг
    public partial class Genre
    {
        public Genre()
        {
            Book = new HashSet<Book>();
        }

        [Key]
        public int Id { get; set; } // ID
        [Required]
        public string NameOfGenre { get; set; } // Название жанра
        
        // Связь между автором и книгой
        public virtual ICollection<Book> Book { get; set; }
    }
}
