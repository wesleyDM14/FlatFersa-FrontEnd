import React from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/userService";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={() => logoutUser(navigate)}>Logout</button>
        </>
    )
}

export default Dashboard;