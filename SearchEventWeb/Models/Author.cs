using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SerachEventWeb.Models
{
    // Таблица справочников авторов
    public partial class Author
    {
        public Author()
        {
            Book = new HashSet<Book>();
        }

        [Key]
        public int Id { get; set; } // ID
        [Required]
        public string Name { get; set; } // Имя
        public string Surname { get; set; } // Фамилия
        public string Patronymic { get; set; } // Отчество

        // Связь между автором и книгой
        public virtual ICollection<Book> Book { get; set; }
    }
}
