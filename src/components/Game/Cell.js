import React from "react";

const cellStyle = {
    width: "50px",
    height: "50px",
    border: "1px solid black",
};

export default function Cell() {
    return (
        <button
            style={cellStyle}
            onClick={() => {
                console.log("hello");
            }}
        ></button>
    );
}
