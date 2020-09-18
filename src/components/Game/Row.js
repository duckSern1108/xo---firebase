import React from "react";

import Cell from "./Cell";

const rowStyle = {
    display: "flex",
};
export default function Row({ play,rowData, rowId }) {
    return (
        <div style={rowStyle}>
            {rowData.map((data, index) => (
                <Cell key={index} id={index} rowId={rowId} data={data} play={play} />
            ))}
        </div>
    );
}
