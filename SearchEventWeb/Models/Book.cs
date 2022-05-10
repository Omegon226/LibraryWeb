using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SerachEventWeb.Models
{
    // Стрежневая таблица книг
    public class Book
    {
        [Key]
        public int Id { get; set; } // ID
        public int AuthorId { get; set; } // FK для автора
        public int GenreId { get; set; } // FK для жанра
        public int PublisherId { get; set; } // FK для издателя
        [Required]
        public string Name { get; set; } // Название книги
        public int NomOfEdition { get; set; } // Номер издания
        public int NumberOfPages { get; set; } // Кол-во страниц

        // Классы для связи
        public virtual Author Author { get; set; }
        public virtual Genre Genre { get; set; }
        public virtual Publisher Publisher { get; set; }
    }
}
