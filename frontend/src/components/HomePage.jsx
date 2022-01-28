import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const auth = useSelector(state => state.auth);

    if (!auth.loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div style={{ alignSelf: 'center' }}>
            <h1>Home Page</h1>
        </div>
    )
}
