import React from "react";
import { useParams } from "react-router-dom";

import Board from "../components/Game/Board";

import fetchRealtimeDataBase from "../components/HOC/fetchRealtimeDataBase";

const Game = () => {
    console.log('GAme render')
    const { id } = useParams();
    const BoardGame = fetchRealtimeDataBase(`/${id}`)(Board);
    return <BoardGame docId={id}/>;
};

export default Game;
