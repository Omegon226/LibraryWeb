import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col, } from 'antd';
import { Table, Card } from 'antd';
import { Button, Space } from 'antd';

const uri = "http://localhost:32144/api/authors/"; // Ссылка на api авторов

const AuthorTableAdmin = () => {
    const [author, setAuthor] = useState([]);  // Состояния для авторов

    const removeAuthor = (removeId) => setAuthor(author.filter(item => item.id !== removeId));  // Функция для удаления организатора из состояния

    // Запускаем запрос на контроллер, чтобы мы смогли получить информацию об авторах
    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setAuthor(response.data);

            })
            .catch((error) => {
                console.log(error);

            });
    }, [setAuthor]);

    // Отправка delete запроса на автора по его id
    const deleteAuthor = (Id) => { 
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removeAuthor(Id) : null;
            })
    };

    // Создаём объект коллоны для элемента таблицы
    // В нём будет содержаться информация об ФИО автора. Имя можно будет редактировать, так же будет присутсвовать кнопка удаления
    const columns = [
        { 
            title: 'Имя автора',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) =>
                <form id={record.id} onSubmit={handleSubmit}>
                    <input size="35" name="name" form={record.id} defaultValue={name} />
                </form>

        },
        {
            title: 'Фамилия автора',
            dataIndex: 'surname',
            key: 'surname',
            render: (surname, record) =>
                <form id={record.id}>
                    <a size="35" name="surname" form={record.id} defaultValue={surname}>{surname}</a>
                </form>

        },
        {
            title: 'Отчество автора',
            dataIndex: 'patronymic',
            key: 'patronymic',
            render: (patronymic, record) =>
                <form id={record.id}>
                    <a size="35" name="patronymic" form={record.id} defaultValue={patronymic}>{patronymic}</a>
                </form>

        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deleteAuthor(record.id)}> Удалить </Button>
            ),
        },



    ];

    // Функция для обновления автора
    const updateAuthor = (authors) => {
        let bufAuthor = Object.assign([], author);
        bufAuthor.filter(item => item.id === authors.id)[0].name = authors.name;
        setAuthor(bufAuthor);
    };

    // Запрос на обновлении информации по автору
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const id = e.target.id;
        const authors = { id: Number(id), name: name};
        axios.put(uri + id, authors)
            .then((response) => {
                response.status = 201 ? updateAuthor(authors) : null;
            })
            .catch(console.error);
    };

    // Вывод таблицы с помощью html
    return (
        <React.Fragment>
            <div>
                <br />
                <h2 align="center">Авторы</h2>
                <br />
                <Card style={{ width: 1490 }} >
                    <Row>
                        <Table align="center" dataSource={author} columns={columns} />
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default AuthorTableAdmin;


