import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import AppAdmin from './appAdmin.jsx'; // app для админа
import AppUser from './appUser.jsx'; // app для пользователя
import { Route, Routes } from "react-router-dom"
import HeaderLog from "./headerLog" // Заоголовок для страницы логина
import HeaderReg from "./headerReg" // Заоголовок для страницы регистрации
import Login from "./login" // Страница логина
import Register from "./registration" // Страница регистрации

// Создаём всевозможные пути
// admin - рабочая панель админа, через которую он может работать с БД (доступен так же функционал пользователя)
// user - эта страница, которая позволяет пользователю увидеть книги в библиотеке
// register - это путь для регистрации нового пользователя (user)
// login - эта функция позволяет нам войти в систему. Является так же начальным окном приложения

const App = () => {
    return (<React.Fragment>
        <Routes>
            <Route path="/admin/*" element={<AppAdmin />} />
            <Route path='/user/*' element={<AppUser />} />
            <Route path='/register' element={<div> <HeaderReg /> <Register /> </div>} />
            <Route path='/login' element={<div> <HeaderLog /> <Login /> </div>} />
            <Route path='/*' element={<div> <HeaderLog /> <Login /> </div>} />
        </Routes>
    </React.Fragment>);
}

export default App;