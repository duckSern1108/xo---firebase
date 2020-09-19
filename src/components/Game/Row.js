import React from "react";

import Cell from "./Cell";

const rowStyle = {
    display: "flex",
};
export default function Row({
    play,
    rowData,
    rowId,
    turn,
    winnerPlayer,
    boardSize,
    winMoves,
}) {
    return (
        <div style={rowStyle}>
            {rowData.map((data, index) => (
                <Cell
                    winMoves={winMoves}
                    boardSize={boardSize}
                    winnerPLayer={winnerPlayer}
                    turn={turn}
                    key={index}
                    id={index}
                    rowId={rowId}
                    data={data}
                    play={play}
                />
            ))}
        </div>
    );
}
