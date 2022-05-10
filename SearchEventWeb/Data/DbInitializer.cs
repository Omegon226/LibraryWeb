using SerachEventWeb.Models;
using System.Linq;

namespace SerachEventWeb.Data
{
    public static class DbInitializer
    {
        // Класс для инициализации БД
        public static void Initialize(LibraryContext context)
        {
            context.Database.EnsureCreated();

            // Если у нас нету ни одной сущности книг, то заполняем нашу таблицу новыми данными
            if (context.Book.Any())
            {
                return;
            }

            // ВНИМНИЕ!!! КАЖДЫЙ ЭЛЕМЕНТ С ID = 1 ЭТО ЗНАЧЕНИЯ ДЛЯ НЕОПРЕДЕЛЁННОЙ ИНФОРМАЦИИ

            // Заполняем таблицу Авторов
            var authors = new Author[]
            {
                new Author { Name = "Информация отсутсвует", Surname = "Информация отсутсвует", Patronymic = "Информация отсутсвует" },
                new Author { Name = "Jake", Surname = "VanderPlas", Patronymic = "Arb" },
                new Author { Name = "Роберт", Surname = "Мартин" },
                new Author { Name = "Эрик", Surname = "Мэтиз" },
                new Author { Name = "Владимир", Surname = "Савельев" },
                new Author { Name = "Эндрю", Surname = "Траск" },
                new Author { Name = "Норман", Surname = "Мэтлофф" }
            };
            // После чего добавляем их в контекст и сохраняем контекст
            foreach (Author b in authors)
            {
                context.Author.Add(b);
            }
            context.SaveChanges();

            // Заполняем таблицу Жанров
            var geners = new Genre[]
            {
                new Genre { NameOfGenre = "Информация отсутсвует" },
                new Genre { NameOfGenre = "Техническая литература" },
                new Genre { NameOfGenre = "Художественная литература" }
            };
            // После чего добавляем их в контекст и сохраняем контекст
            foreach (Genre b in geners)
            {
                context.Genre.Add(b);
            }
            context.SaveChanges();

            // Заполняем таблицу Издателей
            var publishers = new Publisher[]
            {
                new Publisher { Name = "Информация отсутсвует", Scale = "Информация отсутсвует", SpecializationOnTheTypeOfLiterature = "Информация отсутсвует" },
                new Publisher { Name = "Издательство Питер", Scale = "Большая", SpecializationOnTheTypeOfLiterature = "Множественная" },
                new Publisher { Name = "O'Reilly", Scale = "Большая", SpecializationOnTheTypeOfLiterature = "Техническая литература" },
                new Publisher { Name = "Издательство ДМК", Scale = "Средняя", SpecializationOnTheTypeOfLiterature = "Множественная" },
                new Publisher { Name = "Издательство АСТ Москва", Scale = "Маленькая", SpecializationOnTheTypeOfLiterature = "Техническая литература" },
                new Publisher { Name = "Издательство АЙРИС ПРЕСС", Scale = "Средняя", SpecializationOnTheTypeOfLiterature = "Техническая литература" }
            };
            // После чего добавляем их в контекст и сохраняем контекст
            foreach (Publisher b in publishers)
            {
                context.Publisher.Add(b);
            }
            context.SaveChanges();

            // Заполняем таблицу Книг
            // Здесь мы будем заполнять только FK и переменные таблицы
            var books = new Book[]
            {
                new Book { Name = "Python для сложных задач", AuthorId = 2, GenreId = 2, PublisherId = 2, NomOfEdition = 2, NumberOfPages = 576},
                new Book { Name = "Грокаем глубокое обучение", AuthorId = 6, GenreId = 2, PublisherId = 2, NomOfEdition = 1, NumberOfPages = 352},
                new Book { Name = "Чистый код", AuthorId = 3, GenreId = 2, PublisherId = 2, NomOfEdition = 3, NumberOfPages = 464},
                new Book { Name = "Искусство программирования на R", AuthorId = 7, GenreId = 2, PublisherId = 2, NomOfEdition = 2, NumberOfPages = 416},
                new Book { Name = "Статистика и котики", AuthorId = 5, GenreId = 2, PublisherId = 5, NomOfEdition = 3, NumberOfPages = 192},
                new Book { Name = "Изучаем Python", AuthorId = 4, GenreId = 2, PublisherId = 2, NomOfEdition = 3, NumberOfPages = 512}
            };
            // После чего добавляем их в контекст и сохраняем контекст
            foreach (Book b in books)
            {
                context.Book.Add(b);
            }
            context.SaveChanges();
        }
    }
}

