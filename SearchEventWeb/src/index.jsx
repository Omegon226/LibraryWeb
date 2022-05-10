import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { InitializeFooter } from './headerAdmin.jsx';
import { BrowserRouter } from "react-router-dom";
import App from './app.jsx'

// Создаём виртуальный DOM и начинаем работать в div из index.html
const appRoot = ReactDOMClient.createRoot(document.getElementById('app'));

// Здесь мы инициализируем приложение и создаём футер из headerAdmin (он одинаковый для всех)
{
    appRoot.render(<BrowserRouter><App/><InitializeFooter/></BrowserRouter>);
}