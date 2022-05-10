using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SerachEventWeb.Models
{
    public partial class LibraryContext : IdentityDbContext<User>
    {
        #region Constructor
        public LibraryContext()
        {
        }

        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        { }
        #endregion

        // Объявляем таблицы для хранения информации
        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<Genre> Genre { get; set; }
        public virtual DbSet<Publisher> Publisher { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=localhost;Database=LibraryNew;Trusted_Connection=True;");
            }
        }

        // Создаём связи
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            // Говорим об обязательности поля Name у Book
            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
            });

            // Задаём связь между книгами и авторами (0..* к 1)
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Book)
                    .HasForeignKey(d => d.AuthorId);
            });

            // Задаём связь между книгами и жанрами книг (0..* к 1)
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasOne(d => d.Genre)
                    .WithMany(p => p.Book)
                    .HasForeignKey(d => d.GenreId);
            });

            // Задаём связь между книгами и издательствами (0..* к 1)
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasOne(d => d.Publisher)
                    .WithMany(p => p.Book)
                    .HasForeignKey(d => d.PublisherId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
