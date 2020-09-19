import React, { Fragment,useState } from "react";
import firebase from "../firebase";


//import { Link } from "react-router-dom";
const LoginForm = ({ invited, docId, fireStoreData }) => {
    let players = []
    if (fireStoreData) players = fireStoreData.players
    const [roomId, setRoomId] = useState("");

    //form data + handler
    const [username, setUsername] = useState();
    const [color, setColor] = useState();
    const [boardSize, setBoardSize] = useState(5);
    const [ref, setRef] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        const playerData = {
            ref: ref,
            username: username,
            color: color,
            playerId: players.length,
        };
        sessionStorage.setItem('playerData',JSON.stringify(playerData))
        players.push(playerData);
        //update data to firebase
        const db = firebase.firestore().collection("rooms");
        if (!invited) {
            db.add({
                board: Array(boardSize * boardSize).fill(""),
                boardSize: parseInt(boardSize),
                players: players,
                turn: 0,
            }).then(data => setRoomId(data.id));
        } else {
            db.doc(docId).update({ players: players });
        }
    };
    return (
        <Fragment>
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
                    type="color"
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
                            min={5}
                            max={100}
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
        </Fragment>
    );
};

export default LoginForm;
