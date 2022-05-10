import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bookAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';
const { TextArea } = Input;

const uri = "http://localhost:32144/api/books/"; // Ссылка на api книг

const AddBook = ({ book, setBook }) => {  // Передаётся спписок книг
    const [isModalVisible, setIsModalVisible] = useState(false); // Свойство для указания видимости модального окна
    const [author, setAuthor] = useState([]); // Создаём состояния для авторов
    const [genre, setGenre] = useState([]); // Создаём состояния для жанров
    const [publisher, setPublisher] = useState([]); // Создаём состояния для издателей

    // Запускаем запрос на контроллер, чтобы мы смогли получить информацию о авторов
    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32144/api/authors/",
            "mode": 'no-cors',
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
    }, [author]);
    // Запускаем запрос на контроллер, чтобы мы смогли получить информацию о жанров
    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32144/api/geners/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setGenre(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [genre]);
    // Запускаем запрос на контроллер, чтобы мы смогли получить информацию о издателях
    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32144/api/publishers/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setPublisher(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [publisher]);

    // Объект формы
    const [form] = Form.useForm();

    const showModal = () => { // Показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { // Ккнопка подтверждения всплывабщего окна
        setIsModalVisible(false);
    };

    const handleCancel = () => { // Кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addBook = (books) => setBook([...book, books]); // Добавление новой книги

    // Отправка новой книги на сервер и закрытие модального окна
    const handleSubmit = (e) => { 
        const name = e.name;
        const nomOfEdition = e.nomOfEdition;
        const numberOfPages = e.numberOfPages;
        const authorId = e.authorId;
        const genreId = e.genreId;
        const publisherId = e.publisherId;
        handleOk();
        axios.post(uri, {
            name: name, nomOfEdition: nomOfEdition, numberOfPages: numberOfPages,
            authorId: authorId, genreId: genreId, publisherId: publisherId
        })
            .then((response) => {
                response.status = 201 ? addBook(response.data) : null;
            })
            .catch(console.error);
    };

    // Здесь у нас html модального окна. В нём будут все нужные элементы для добавления новой книги
    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}> Добавить новую книгу </Button>

                <Modal title="Добавить новую книгу" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Название"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите название!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item                            
                            label="Номер издания"
                            name="nomOfEdition"
                            rules={[
                                {
                                    required: false,
                                    message: 'Выберите номер издания!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Кол-во страниц"
                            name="numberOfPages"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите кол-во страниц!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Автор"
                            name="authorId"
                            rules={[
                                {
                                    required: false,

                                },
                            ]}
                        >
                            <Select>
                                {author.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Жанр"
                            name="genreId"
                            rules={[
                                {
                                    required: false,

                                },
                            ]}
                        >
                            <Select>
                                {genre.map(({ id, nameOfGenre }) => (
                                    <Option value={id}>{nameOfGenre}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Издатель"
                            name="publisherId"
                            rules={[
                                {
                                    required: false,

                                },
                            ]}
                        >
                            <Select>
                                {publisher.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        </React.Fragment>
    );
};

export default AddBook;