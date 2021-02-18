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
    players
}) {
    const { playerId, ref, color } = JSON.parse(
        sessionStorage.getItem("playerData")
    );
    function getColor() {
        let color =""
        players.forEach(player => {
            if ( player.ref === data ) color = player.color
        })
        return color
    }
    const haveWinner = winMoves ?  winMoves.some((move) => rowId * boardSize + id === move) : false;
    const cellStyle = {
        width: "50px",
        height: "50px",
        border: "1px solid black",
        fontWeight: 600,
        color: getColor(),
        background: haveWinner ? "yellow" : "white",
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
