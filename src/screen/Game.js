import React from "react";
import { useParams } from "react-router-dom";

import Board from "../components/Game/Board";

import fetchRealtimeFireStore from "../components/HOC/fetchRealtimeFireStore";

const Game = () => {
    const { id } = useParams();
    const BoardGame = fetchRealtimeFireStore("rooms")(id)(Board);
    return <BoardGame docId={id}/>;
};

export default Game;
