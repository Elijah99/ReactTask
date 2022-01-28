import React from "react";
import Alert from 'react-bootstrap/Alert'

const errorAuth = ({ message }) => {
    return (
        <Alert variant="danger" className="mt-3">
            {message}
        </Alert>
    )
}

export default errorAuth;