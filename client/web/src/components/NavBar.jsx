import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ADD_DUMP_ROUTE, ADMIN_ROUTE, MAIN_ROUTE } from '../utils/consts'

const NavBar = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    <Link to={MAIN_ROUTE} className="normalize__link">Dumps View</Link>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link>
                        <Link to={ADMIN_ROUTE} className="normalize__link">Админ панель</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to={ADD_DUMP_ROUTE} className="normalize__link">Добавить</Link>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar