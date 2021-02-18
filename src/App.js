import React,{Suspense} from "react";

//css
import "./App.css";
//import router
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoadingOverView from './components/LoadingOverView'
//import screen
// import Login from "./screen/Login";
// import Game from "./screen/Game";
const Login = React.lazy(() => import("./screen/Login/Login"));
const Game = React.lazy(() => import("./screen/Game/Game"));

function App() {
    return (
        <Router>
            <Suspense fallback={<LoadingOverView />}>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/:id">
                        <Game />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
