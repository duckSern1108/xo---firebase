import React, { Fragment } from "react";

import Row from "./Row";

import { updateFireStore } from "../../ultis";
export default function Board({ fireStoreData, docId }) {
    const { boardSize, board, turn, players } = fireStoreData;
    console.log(fireStoreData);
    const rowsData = [];
    const play = (rowId, id, ref) => {
        board[rowId * boardSize + id] = ref;
        updateFireStore(docId, { board: board, turn: turn === 1 ? 0 : 1 });
    };

    for (let i = 0; i < boardSize; i++) {
        const rowData = [];
        for (let j = 0; j < boardSize; j++) {
            rowData.push(board[i * boardSize + j]);
        }
        rowsData.push(rowData);
    }
    const handleChange = () => {
        updateFireStore(docId, { turn: turn === 1 ? 0 : 1 });
    };
    if (players)
        return (
            <Fragment>
                <label>Who go first</label>
                <input
                    type="radio"
                    checked={turn === 1}
                    onChange={handleChange}
                />
                <label>{players[0].username}</label>
                {players[1] && (
                    <>
                        <input
                            type="radio"
                            checked={turn === 0}
                            onChange={handleChange}
                        />
                        <label>{players[1].username}</label>
                    </>
                )}
                {
                    //game field
                    rowsData.map((rowData, index) => (
                        <Row
                            play={play}
                            rowData={rowData}
                            key={index}
                            rowId={index}
                            turn={turn}
                        />
                    ))
                }
            </Fragment>
        );
    else return <div>Loading...</div>;
}
