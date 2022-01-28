import React from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import "./Login.css"

const login = () => {
    return (
        <div className="Login">
            <div className="Login-wrapper">
                <h3 style={{textAlign: 'center'}}>Login</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Enter login" required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default login;