import React, { Component } from 'react';
import { useNavigate, NavLink } from "react-router-dom"
import logOutIcon from './image/logout_icon.svg';
import axios from 'axios';

const HeaderUser = () => {
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

    // Визуализация заголовка с его функционалом (просмотром списка литературы)
    return (
        <div className="px-3 py-2 bg-warning text-black">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <span className="fs-4 text-black">Список литературы библиотеки</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={logOutIcon} alt="" width="24" height="24" onClick={Exit} />
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>);
}

export default HeaderUser;