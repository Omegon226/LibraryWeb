import React, { Component } from 'react';
import bookIcon from './image/open_book_svgrepo_com.svg';
import authorIcon from './image/author_writer.svg';
import logOutIcon from './image/logout_icon.svg';
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios';

const Initialize = () => {
    // Функция для выход из системы
    let navigate = useNavigate();
    const Exit = () => {
        axios.post('http://localhost:32144/api/Account/' + 'LogOff', {}, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    navigate("../login", { replace: true });
                }
            })
            .catch(console.error);
    }

    // Визуализация заголовка с его функционалом (просмотром списка литературы и работы с авторами/издателями)
    return (
        <div className="px-3 py-2 bg-secondary text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <span className="fs-4 text-white">Управление списком литературы библиотекии</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a href="/" className="nav-link text-white">
                                <img className="bi d-block mx-auto mb-1" src={bookIcon} alt="" width="24" height="24" onClick={Exit} />
                                Книги
                            </a>
                        </li>
                        <li>
                            <NavLink to={'/admin/author'} className="nav-link text-white">
                                <img className="bi d-block mx-auto mb-1" src={authorIcon} alt="" width="24" height="24" />
                                Авторы
                            </NavLink>
                        </li>
                        <li>
                            <a className="nav-link text-white">
                                <img className="bi d-block mx-auto mb-1" src={logOutIcon} alt="" width="24" height="24" onClick={Exit} />
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>);
}

// Футер для приложения
function Footer() {
    return (<div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">©Omegon Смирнов Иван Михайлович 2022 3-41хх</span>
            </div>
        </footer>
    </div>);
}


export function InitializeAdminTheme() { return Initialize(); }
export function InitializeFooter() { return Footer(); }