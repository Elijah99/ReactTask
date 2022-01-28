import React from "react";
import "./Main.css"

const main = (props) => {
    return (
        <main className="Main">
            {props.children}
        </main>
    )
}

export default main;