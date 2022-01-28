import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import "./Login.css"
import { login } from "../services/auth.service"
import ErrorAuth from "./ErrorAuth";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const { handleAuthError, authError } = props;

    useEffect(() => {
        setTimeout(() => {
            handleAuthError(false, '');
        }, 1000)
    }, [authError.isAuthError])

    if (props.auth.loggedIn) {
        return <Navigate to="/certificates" />;
    }

    const validationSchema = yup.object().shape({
        username: yup.string()
            .max(30, 'Username field length must not be greater than 30 characters')
            .min(3, 'Username field length must not be less than 3 characters')
            .required(),
        password: yup.string()
            .max(30, 'Password field length must not be greater than 30 characters')
            .min(4, 'Password field length must not be less than 3 characters')
            .required()
    });

    return (
        <div className="Login">
            <div className="Login-title">Login</div>
            <Formik
                validationSchema={validationSchema}
                onSubmit={values => {
                    login(values.username, values.password)
                        .then(
                            user => {
                                props.handleAuthLogin(true, { username: user.username, role: user.role });
                            },
                            message => {
                                props.handleAuthError(true, message);
                            });
                }}
                initialValues={{
                    username: '',
                    password: ''
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column">
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Username sample: 'Ivan'
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Enter password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Password should be greater than 4 and less than 30 characters
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="Login-button">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            {authError.isAuthError ? <ErrorAuth message={authError.errorMassage} /> : null}
        </div>
    )
}
