import React from "react";

//css
import './App.css'
//import screen
import Login from "./screen/Login";
import Game from "./screen/Game"

//import router
import {Switch,BrowserRouter as Router , Route} from "react-router-dom"

//const App = React.createContext()
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
