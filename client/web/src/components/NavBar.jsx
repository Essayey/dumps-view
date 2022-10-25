import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { Container, Nav, Navbar, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '..'
import { ADD_DUMP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
const logo = require('../static/img/logo.png')

const NavBar = observer(() => {
    const { user } = useContext(Context);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        user.setIsAuth(false);
    }

    return (
        <Navbar style={{ background: '#e1e1e1' }} variant="light">
            <Container>
                <Navbar.Brand>
                    <Link to={MAIN_ROUTE} className="normalize__link">
                        <Image src={String(logo)} style={{ width: 32, height: 32 }} />
                    </Link>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    {user.isAuth ?
                        <Fragment>
                            {user.user.role === 'Admin' &&
                                <Nav.Link>
                                    <Link to={ADMIN_ROUTE} className="normalize__link" style={{ color: '#1a6c16', fontWeight: 500 }}>Админ панель</Link>
                                </Nav.Link>
                            }
                            <Nav.Link>
                                <Link to={ADD_DUMP_ROUTE} className="normalize__link" style={{ color: '#1a6c16', fontWeight: 500 }}>Добавить</Link>
                            </Nav.Link>
                            <Button onClick={handleLogout} style={{ background: '#ce545f' }}>Выйти</Button>
                        </Fragment>
                        :
                        <Fragment>
                            <Nav.Link>
                                <Link to={LOGIN_ROUTE} className="normalize__link" style={{ color: '#1a6c16', fontWeight: 500 }}>Войти</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to={REGISTRATION_ROUTE} className="normalize__link" style={{ color: '#1a6c16', fontWeight: 500 }}>Регистрация</Link>
                            </Nav.Link>
                        </Fragment>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar