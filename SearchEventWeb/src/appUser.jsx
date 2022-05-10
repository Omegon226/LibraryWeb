import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import HeaderUser from './headerUser' // Заголовок для пользователя
import { Route, Routes } from "react-router-dom"
import { InitializeBookUser } from './bookUser.jsx'; // Страница со списком литературы для пользователя

// book - путь для просмотра списка литературы, так же является стандартным при открытии через app.jsx

const AppUser = () => {
    return (<React.Fragment>
        <HeaderUser/>
        <Routes>
            <Route path="/bookUser" element={<InitializeBookUser />} />
            <Route path='/*' element={<InitializeBookUser />} />
        </Routes>
    </React.Fragment>);
}

export default AppUser;