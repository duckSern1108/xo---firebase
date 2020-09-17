import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";

import Board from "../components/Game/Board";

const Game = () => {
    const { id } = useParams();
    const [gameData, setGameData] = useState({});
    useEffect(() => {
        const unSub = firebase
            .firestore()
            .collection("rooms")
            .doc(id)
            .onSnapshot((snapshot) => {
                console.log(snapshot.data());
                setGameData(snapshot.data());
            });
        return unSub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const { boardSize } = gameData;
    return <Board boardSize={boardSize} />;
};

export default Game;
