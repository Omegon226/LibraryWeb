import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import BookCardAdmin from './bookCardAdmin' // Путь для вывода информации о списке литературы для админа
import AddBook from './createBook' // Путь для функционала по добавления новой книги
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


export function InitializeBookAdmin() { return Book(); }

const Book = () => {

    // Проверка роли перед заходом на эту страницу (иначе выброс на страницу по авторизации)
    let navigate = useNavigate();
    axios.post('http://localhost:32144/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);

    const [book, setBook] = useState([]); // Состояния для книг
    const [author, setAuthor] = useState([]); // Состояния для авторов
    const [genre, setGenre] = useState([]); // Состояния для жанров
    const [publisher, setPublisher] = useState([]); // Состояния для издателей

    // Создаём контейнеры для добавления новых книг и вывод списка литературы
    return (
        <div className="container" >
            <AddBook
                book={book}
                setBook={setBook}
                author={author}
                setAuthor={setAuthor}
                genre={genre}
                setGenre={setGenre}
                publisher={publisher}
                setPublisher={setPublisher}
            />
            <BookCardAdmin
                book={book}
                setBook={setBook}
            />
        </div>
    );
}