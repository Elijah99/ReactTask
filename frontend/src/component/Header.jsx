import React from "react";
import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./Header.css"

const header = () => {
    return(
        <Navbar bg="dark" expand="lg" variant="dark" className="Header">
            <Container className="mx-0">
                <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default header;