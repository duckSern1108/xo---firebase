import React from "react";
import { useLocation } from "react-router-dom";

import fetchFireStore from "../components/HOC/fetchFireStore";
import LoginForm from "../components/LoginForm"

const Login = () => {
    const location = useLocation();
    //if player invited
    if (location.search) {
        const docId = location.search.slice(1, location.search.length);
        console.log(docId);
        const InvitedLogin = fetchFireStore("rooms")(docId)(LoginForm)
        return <InvitedLogin invited = {true} docId = {docId}/>
    }
    else return <LoginForm invited = {false} />    
};

export default Login;
