import React from "react";
import { Button, Navbar } from "react-bootstrap";
import "./Header.css"
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../action/createActions";
import { logout } from "../services/auth.service";
import Profile from "./Profile";
import AddCertificateContainer from "../containers/AddCertificateContainer";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleClick = () => {
        logout();
        dispatch(authLogout());
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="Header justify-content-between px-4">
            <div className="d-flex justify-content-start">
                <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
                {localStorage.getItem('role') === 'ROLE_ADMIN' ? <AddCertificateContainer /> : null}
            </div>
            <div className="d-flex justify-content-end">
                {localStorage.getItem('username') ? <Profile username={localStorage.getItem('username')} /> : null}
                {auth.loggedIn ? <Button onClick={handleClick} variant="success">Logout</Button> : null}
            </div>
        </Navbar>
    )
}