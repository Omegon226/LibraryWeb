import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col, } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';
import { Empty } from 'antd';

const uriBook = "http://localhost:32144/api/books/"; // Ссылка на api книг

const BookCardUser = () => {

    const [book, setBook] = useState([]); // Создаём состояния для книг

    // Запускаем запрос на контроллер, чтобы мы смогли получить информацию о книгах
    useEffect(() => {
        axios({
            "method": "GET",
            "url": uriBook,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setBook(response.data);

            })
            .catch((error) => {
                console.log(error);

            });
    }, [setBook]);

    // У нас будут выводится таблица ссо списком литературы. Пользователь смот только смотреть её
    return (
        <React.Fragment>

            <br />
            <h2 align="center">Весь список литературы представленный в библиотеке</h2>
            <br />

            {book.map(({ id, name, nomOfEdition, numberOfPages, author, genre, publisher }) => (

                <div className="Book" key={id} id={id} >

                    <Card hoverable style={{ width: 1290 }} >
                        <Row>
                            <Col span={18}>
                                <Row>
                                    <h5><strong> {name} </strong></h5>
                                </Row>

                                <Row>
                                    <h6> Номер издательства {nomOfEdition} </h6>
                                </Row>

                                <Row>
                                    <h6> Кол-во страниц {numberOfPages} </h6>
                                </Row>

                                <div>
                                    <h6><strong>Описание:</strong></h6>
                                    <div>
                                        <Row>
                                            <Col span={14}>
                                                <Row>
                                                    <h6><strong>Жанр:&nbsp;&nbsp;</strong></h6>
                                                    <p>{genre.nameOfGenre}</p>
                                                </Row>
                                                <Row>
                                                    <h6><strong>Автор:&nbsp;&nbsp;</strong></h6>
                                                    <p>{author.surname} {author.name} {author.patronymic}</p>
                                                </Row>
                                                <Row>
                                                    <h6><strong>Издатель:&nbsp;&nbsp;</strong></h6>
                                                    <p>{publisher.name}</p>
                                                    <p>Размер: {publisher.scale}</p>
                                                    <p>Специализация: {publisher.specializationOnTheTypeOfLiterature}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

            ))}
        </React.Fragment>
    );
};

export default BookCardUser;