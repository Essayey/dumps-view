import React, { Fragment, useState } from 'react'
import { useContext } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const { user } = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation();
    const isRegistration = location.pathname === REGISTRATION_ROUTE;


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // let data;
            // MOCK
            let data = { role: 'ADMIN' }
            if (isRegistration) {
                // await handle registration
            }
            else {
                // await handle login
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <div className="Container">
                <div
                    style={{ minHeight: 'calc(100vh - 56px)' }}
                    className='d-flex justify-content-center align-items-center'
                >
                    <Card style={{ width: '20rem' }} className='p-3'>
                        <h2 className='m-auto'>
                            {isRegistration
                                ? 'Регистрация'
                                : 'Авторизация'
                            }

                        </h2>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder='Введите пароль'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {
                                isRegistration &&
                                <Form.Control
                                    className='mt-3'
                                    placeholder='Подтвердите пароль'
                                    type='password'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            }
                            <div className='d-flex justify-content-center mt-3'>
                                <Button type='submit'>
                                    {isRegistration
                                        ? 'Зарегистрироваться 🤩'
                                        : 'Войти 😎'
                                    }
                                </Button>
                            </div>
                        </Form>
                        <div className='d-flex justify-content-center mt-3'>
                            {isRegistration
                                ?
                                <Fragment>
                                    Уже есть аккаунт?&nbsp;<Link to={LOGIN_ROUTE}>Авторизация</Link>
                                </Fragment>
                                : <Fragment>
                                    Нет аккаунта?&nbsp;<Link to={REGISTRATION_ROUTE}>Регистрация</Link>
                                </Fragment>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Auth