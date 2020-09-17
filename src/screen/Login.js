import React, { useState } from "react";
import firebase from "../firebase";

const Login = () => {
    const [username, setUsername] = useState();
    const [color, setColor] = useState();
    const [boardSize, setBoardSize] = useState();
    const onSubmit = (e) => {
        e.preventDefault();
        firebase.firestore().collection("rooms")
            .add({
                board: Array(boardSize * boardSize).fill(""),
                boardSize: boardSize,
                players: [{ ref: "X", username: username, color: color }],
            })
            .then((data) => {
                console.log(data.id);
                sessionStorage.setItem("ownRoomId", data.id);
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <label>Username :</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Pick a color : </label>
            <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <br />
            <label>Board size : </label>
            <input
                type="number"
                min={3}
                max={10}
                value={boardSize}
                onChange={(e) => setBoardSize(e.target.value)}
            />
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Login;
