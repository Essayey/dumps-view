import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '..'
import { ADD_DUMP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'

const NavBar = observer(() => {
    const { user } = useContext(Context);
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    <Link to={MAIN_ROUTE} className="normalize__link">Dumps View</Link>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    {user.isAuth ?
                        <Fragment>
                            {user.user.role === 'ADMIN' &&
                                <Nav.Link>
                                    <Link to={ADMIN_ROUTE} className="normalize__link">Админ панель</Link>
                                </Nav.Link>
                            }
                            <Nav.Link>
                                <Link to={ADD_DUMP_ROUTE} className="normalize__link">Добавить</Link>
                            </Nav.Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Nav.Link>
                                <Link to={LOGIN_ROUTE} className="normalize__link">Войти</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to={REGISTRATION_ROUTE} className="normalize__link">Регистрация</Link>
                            </Nav.Link>
                        </Fragment>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar