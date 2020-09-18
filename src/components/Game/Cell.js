import React from "react";

const cellStyle = {
    width: "50px",
    height: "50px",
    border: "1px solid black",
};

export default function Cell({ data, play, id, rowId }) {
    const playerData = JSON.parse(sessionStorage.getItem('playerData'))
    console.log('play',play)
    return (
        <button
            style={cellStyle}
            onClick={() => {
                play(rowId, id, playerData.ref);
            }}
        >
            {data}
        </button>
    );
}
