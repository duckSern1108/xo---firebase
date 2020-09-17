import React, { Fragment } from "react";

import Row from "./Row";

export default function Board({ fireStoreData }) {
    const {boardSize,board} = fireStoreData
    const boardEle =[]
    for (let i = 0 ; i < boardSize ;i++) {
        boardEle.push(<Row boardSize={boardSize} key={i} />)
    }

    return <Fragment>{boardEle}</Fragment>;
}
