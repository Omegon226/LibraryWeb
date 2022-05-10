using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace SerachEventWeb.Models
{
    // Таблица справочников издателей 
    public partial class Publisher
    {
        public Publisher()
        {
            Book = new HashSet<Book>();
        }

        [Key]
        public int Id { get; set; } // ID
        [Required]
        public string Name { get; set; } // Название издателя
        public string Scale { get; set; } // Размер издательства
        public string SpecializationOnTheTypeOfLiterature { get; set; } // Тип книг на которые специализируется издательство

        // Связь между автором и книгой
        public virtual ICollection<Book> Book { get; set; }
    }
}
