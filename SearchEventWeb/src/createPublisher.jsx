import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bookAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32144/api/publishers/"; // Ссылка на api издательства

const AddPublisher = ({ publisher, setPublisher }) => { // Передается список издателей
    const [isModalVisible, setIsModalVisible] = useState(false); // Свойство для указания видимости модального окна

    // Объект формы
    const [form] = Form.useForm();

    const showModal = () => { // Показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { // Кнопка подтверждения всплывабщего окна
        setIsModalVisible(false);
    };

    const handleCancel = () => { // Кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addPublisher = (publishers) => setPublisher([...publisher, publishers]); // Добавление нового издателя

    // Отправка нового издателя на сервер и закрытие модального окна
    const handleSubmit = (e) => { 
        const name = e.name;
        const scale = e.scale;
        const specializationOnTheTypeOfLiterature = e.specializationOnTheTypeOfLiterature;
        
        handleOk();
        axios.post(uri, {
            name: name, scale: scale, specializationOnTheTypeOfLiterature: specializationOnTheTypeOfLiterature
        })
            .then((response) => {
                response.status = 201 ? addPublisher(response.data) : null;
            })
            .catch(console.error);
    };

    // Здесь у нас html модального окна. В нём будут все нужные элементы для добавления нового издательства 
    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить издателя</Button>

                <Modal title="Добавить издателя" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Название"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите Название издателя!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Размер"
                            name="scale"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите размер издателя!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Специализация"
                            name="specializationOnTheTypeOfLiterature"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите специализацию издателя!',
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

export default AddPublisher;