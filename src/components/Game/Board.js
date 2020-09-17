import React, { Fragment } from "react";

import Row from "./Row";

export default function Board({ boardSize }) {
    const board =[]
    for (let i = 0 ; i < boardSize ;i++) {
        board.push(<Row boardSize={boardSize} key={i} />)
    }

    return <Fragment>{board}</Fragment>;
}
