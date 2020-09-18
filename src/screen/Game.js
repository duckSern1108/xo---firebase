import React from "react";
import { useParams } from "react-router-dom";

import Board from "../components/Game/Board";

import fetchFireStore from "../components/HOC/fetchFireStore";

const Game = () => {
    const { id } = useParams();
    const BoardGame = fetchFireStore("rooms")(id)(Board);
    return <BoardGame docId={id}/>;
};

export default Game;
