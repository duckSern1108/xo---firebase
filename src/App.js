import React from "react";
import Login from "./screen/Login";
import Game from "./screen/Game"

import {Switch,BrowserRouter as Router , Route} from "react-router-dom"
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/:id">
                    <Game />
                </Route>
            </Switch>
        </Router>    
    );
}

export default App;
