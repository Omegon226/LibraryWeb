import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import { InitializeAdminTheme, } from './headerAdmin.jsx'; // Заголовок для админа
import { InitializeBookAdmin } from './bookAdmin.jsx'; // Страница списка литературы для админа
import { InitializeAuthor } from './authorAdmin.jsx'; // Страница авторов для админа
import { Route, Routes } from "react-router-dom"

// book - путь для работы со списком литературы, так же является стандартным при открытии через app.jsx
// author - путь к элементам для работы с авторами и издателями

const AppAdmin = () => {
    return (<React.Fragment>
        <InitializeAdminTheme />
        <Routes>
            <Route path="/book" element={<InitializeBookAdmin />} />
            <Route path='/author' element={<InitializeAuthor />} />
            <Route path='/*' element={<InitializeBookAdmin />} />
        </Routes>
    </React.Fragment>);
}

export default AppAdmin;