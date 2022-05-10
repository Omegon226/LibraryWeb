import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './authorAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';

const uri = "http://localhost:32144/api/publishers/"; // Ссылка на api издательства

const DelPublisher = ({ publisher, setPublisher }) => { // Передается список издателей
    const [isModalVisible, setIsModalVisible] = useState(false); // Свойство для указания видимости модального окна

    const removePublisher = (removeId) => setPublisher(publisher.filter(item => item.id !== removeId)); // Удаление нового издателя из списка

    // Запускаем запрос на контроллер, чтобы мы смогли получить информацию о издателях
    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
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
    }, [setPublisher]);

    const showModal = () => { // Показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleCancel = () => { // Кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    // Прописываем запрос на удаление издателя по id
    const deletePublisher = (Id) => { 
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removePublisher(Id) : null;
            })
    };

    // Создаём объект коллоны для элемента таблицы
    // В нём будет содержаться информация о названии, размере и специализации издательства. Так же будет кнопка удаления из БД элемента
    const columns = [            
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Размер',
            dataIndex: 'scale',
            key: 'scale',
        },
        {
            title: 'Специализация',
            dataIndex: 'specializationOnTheTypeOfLiterature',
            key: 'specializationOnTheTypeOfLiterature',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deletePublisher(record.id)}> Удалить </Button>
            ),
        },

    ];

    // У нас будет выводится информация об издателях, а так же в этой таблице мы сможем удалять её элементы
    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Удаление издателя</Button>

                <Modal title="Удаление издателя" visible={isModalVisible} onCancel={handleCancel}>
                    <br />
                    <Table dataSource={publisher} columns={columns} />
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default DelPublisher;