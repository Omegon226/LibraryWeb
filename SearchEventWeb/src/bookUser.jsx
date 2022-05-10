import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import BookCardUser from './bookCardUser' // Путь для вывода информации о списке литературы для пользователя
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


export function InitializeBookUser() { return Book(); }

const Book = () => {

    // Проверка роли перед заходом на эту страницу
    let navigate = useNavigate();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:32144/api/Account/' + 'checkRole')
        .then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.role === "admin") {
                    navigate("../admin", { replace: true });
                }
                if (response.data.role === "user") {
                    navigate("../user", { replace: true });
                }
            }
        })
        .catch(console.error);


    const [book, setBook] = useState([]); // Состояния для книг

    // Создаём контейнеры для вывод списка литературы
    return (
        <div className="container" >
            <BookCardUser
                book={book}
                setBook={setBook}
            />

        </div>
    );
}