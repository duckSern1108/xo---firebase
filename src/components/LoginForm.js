import React, { useState } from "react";
import { randomID } from "../ultis";
import firebase from "../firebase";

//import { Link } from "react-router-dom";
const LoginForm = (props) => {
    const { invited, docId, fireStoreData } = props;
    let players = null;
    if (fireStoreData) players = fireStoreData.players;
    console.log(players);
    if (players) console.log("u can join");
    else console.log("u can not join");

    const [roomId, setRoomId] = useState(docId);

    //random player Id
    const playerID = randomID(6);
    sessionStorage.playerID = playerID;
    console.log(playerID);

    //form data + handler
    const [username, setUsername] = useState();
    const [color, setColor] = useState();
    const [boardSize, setBoardSize] = useState(3);
    const [ref, setRef] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        const playerData = {
            ref: ref,
            username: username,
            color: color,
            id: playerID,
        };
        sessionStorage.setItem('playerData',JSON.stringify(playerData))
        const db = firebase.firestore().collection("rooms");
        if (!invited) {
            db.add({
                board: Array(boardSize * boardSize).fill(""),
                boardSize: parseInt(boardSize),
                players: [playerData],
            }).then((data) => {
                console.log(data.id);
                setRoomId(data.id);
            });
        } else {
            players.push(playerData);
            console.log(players);
            db.doc(docId).update({
                players: players,
            });
        }
    };
    return (
        <>
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
                <label>Pick your fav character </label>
                <input
                    type="text"
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                />
                <br />
                {!invited && (
                    <>
                        <label>Board size : </label>
                        <input
                            type="number"
                            min={3}
                            max={10}
                            value={boardSize}
                            onChange={(e) => setBoardSize(e.target.value)}
                        />
                        <br />
                    </>
                )}

                <input
                    type="submit"
                    value={invited ? "Join room" : "Create room"}
                />
            </form>
            {roomId && <p>Invite link : {`/?${roomId}`}</p>}
        </>
    );
};

export default LoginForm;
