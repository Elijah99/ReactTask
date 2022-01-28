import React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import "./Profile.css"

const profile = ({ username }) => {
    return (
        <div className="Profile"><PersonOutlineIcon /> {username}</div>
    );
}

export default profile;