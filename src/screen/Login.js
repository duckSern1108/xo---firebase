import React from "react";
import { useLocation } from "react-router-dom";

import fetchRealTimeFireStore from "../components/HOC/fetchRealtimeFireStore";
import LoginForm from "../components/Login/LoginForm"

const Login = () => {
    const location = useLocation();
    //if player invited
    if (location.search) {
        const docId = location.search.slice(1, location.search.length);
        console.log(docId);
        const InvitedLogin = fetchRealTimeFireStore("rooms")(docId)(LoginForm)
        return <InvitedLogin invited = {true} docId = {docId}/>
    }
    else return <LoginForm invited = {false} />    
};

export default Login;
