import React from "react";
import { useParams } from "react-router-dom";

import Board from "./Board";


const Game = () => {
    const { id } = useParams();
    return <Board docId={id}/>;
};

export default Game;
