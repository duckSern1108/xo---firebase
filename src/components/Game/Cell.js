import React from "react";

export default function Cell({
    data,
    play,
    id,
    rowId,
    turn,
    winner,
    winMoves,
    boardSize,
}) {
    const { playerId, ref, color } = JSON.parse(
        sessionStorage.getItem("playerData")
    );
    const haveWinner = winMoves.some((move) => rowId * boardSize + id === move);
    const cellStyle = {
        width: "50px",
        height: "50px",
        border: "1px solid black",
        fontWeight: 600,
        color: color,
        background: haveWinner && "yellow",
    };
    return (
        <button
            style={cellStyle}
            onClick={() => {
                play(rowId, id, ref);
            }}
            disabled={
                data !== "" ||
                parseInt(playerId) !== turn ||
                winner !== ""
            }
        >
            {data}
        </button>
    );
}
