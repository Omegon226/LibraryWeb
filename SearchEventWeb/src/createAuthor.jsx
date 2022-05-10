import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './authorAdmin' // Импортируем функционал и информацию из файла с авторами
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32144/api/authors/"; // Ссылка на Api авторов

const AddAuthor = ({ author, setAuthor }) => { // Передаётся списко авторов
    const [isModalVisible, setIsModalVisible] = useState(false); // Устанавливаем состояния по видимости окна

    // Объект формы
    const [form] = Form.useForm();

    const showModal = () => { // Показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { // Кнопка подтверждения всплывабщего окн
        setIsModalVisible(false);
    };

    const handleCancel = () => { // Кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addAuthor = (authors) => setAuthor([...author, authors]); // Добавление нового автора в список

    // Запрос на создание нового автора черз контроллер и закрытие модального окна
    const handleSubmit = (e) => { 
        const name = e.name;
        const surname = e.surname;
        const patronymic = e.patronymic;
        handleOk();
        axios.post(uri, {
            name: name, surname: surname, patronymic: patronymic
        })
            .then((response) => {
                response.status = 201 ? addAuthor(response.data) : null;
            })
            .catch(console.error);
    };

    // html модального окна для авторов
    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить автора</Button>

                <Modal title="Добавить автора" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Имя"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите Имя автора!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="surname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите Фамилию автора!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Отчество"
                            name="patronymic"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите Отчество автоар!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AddAuthor;