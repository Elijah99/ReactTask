import React from "react";
import "./Main.css"
import Login from "./Login";

const isLoginPage = true;

const main = () => {
    return (
        <main className={isLoginPage ? "Main Main-login-container" : "Main"}>
            <Login/>
        </main>
    )
}

export default main;