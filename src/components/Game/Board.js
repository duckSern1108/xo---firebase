import React, { Fragment } from "react";

import Row from "./Row";
import firebase from "../../firebase";
export default function Board({ fireStoreData,docId }) {
    const { boardSize, board } = fireStoreData;
    const rowsData = [];
    const play = (rowId, id, ref) => {
        board[rowId * boardSize + id] = ref;
        firebase.firestore().collection("rooms").doc(docId).update({
            board: board,
        });
    };

    for (let i = 0; i < boardSize; i++) {
        const rowData = [];
        for (let j = 0; j < boardSize; j++) {
            rowData.push(board[i * boardSize + j]);
        }
        rowsData.push(rowData);
    }
    return (
        <Fragment>
            {rowsData.map((rowData, index) => (
                <Row play={play} rowData={rowData} key={index} rowId={index} />
            ))}
        </Fragment>
    );
}
