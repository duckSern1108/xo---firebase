import React from "react";

import Cell from './Cell'

const rowStyle = {
    display : "flex",
}
export default function Row({boardSize}) {
    const row = []
    for (let i = 0 ; i<boardSize ;i++) {
        row.push(<Cell key = {i} />)
    }
    return (
        <div style ={rowStyle}>
            {row}
        </div>
    );
}
