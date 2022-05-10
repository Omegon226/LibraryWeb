import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import AuthorTableAdmin from './authorTableAdmin' // Получени элемента для вывода таблицы авторов
import 'antd/dist/antd.css';
import AddPublisher from './createPublisher' // Получаем функционал по созданию издателей
import DelPublisher from './deletePublisher' // Получаем функционал по удалению издателей
import { Row, Space, } from 'antd'; 
import AddAuthor from './createAuthor' // Получаем функционал по созданию новых авторов
import { useNavigate, NavLink } from 'react-router-dom';


export function InitializeAuthor() { return Author(); } // Инициализация страницы для работы с авторами и издателями

const Author = () => {
    const [author, setAuthor] = useState([]); // Состояния для авторов
    const [publisher, setPublisher] = useState([]); // Состояния для издателей

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

    // Создаём контейнеры для добавления просмотра и редактирования авторов и для просмотра, удаления, редактирования издателей
    return (
        <div className="container">

            <Row>
                <Space>
                    <DelPublisher
                        publisher={publisher}
                        setPublisher={setPublisher}
                    />
                    <AddPublisher
                        publisher={publisher}
                        setPublisher={setPublisher}
                    />
                    <AddAuthor
                        author={author}
                        setAuthor={setAuthor}
                    />
                </Space>
            </Row>

            <AuthorTableAdmin
                author={author}
                setAuthor={setAuthor}
            />

        </div>
    );
}