import React from "react";
import { useLocation } from "react-router-dom";

import LoginForm from "./LoginForm"

const Login = () => {
    const location = useLocation();
    //if player invited
    if (location.search) {
        const docId = location.search.slice(1, location.search.length);
        return <LoginForm invited = {true} docId = {docId}/>
    }
    else return <LoginForm invited = {false} />
};

export default Login;
