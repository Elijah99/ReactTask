import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PageNotFound.css"

const pageNotFound = () => {

    return (
        <div className="PageNotFound">
            <h1>404 Page Not Found</h1>
            <Link to="/">
                <Button variant="primary">Home</Button>
            </Link>
        </div>
    )
}

export default pageNotFound;