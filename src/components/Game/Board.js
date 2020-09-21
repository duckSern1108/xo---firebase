import React, { Fragment } from "react";

import Row from "./Row";

import { updateFireStore, updateTurn, findWinner } from "../../ultis";
import firebase from "../../firebase";

import { Link } from "react-router-dom";
//import UIcomponent
import Button from "@material-ui/core/Button";

export default function Board({ fireStoreData, docId }) {
    const { boardSize, board, turn, players, winner, winMoves } = fireStoreData;
    //when user draw on board
    const play = (rowId, id, ref) => {
        board[rowId * boardSize + id] = ref;
        updateFireStore(docId, {
            board: board,
            turn: updateTurn(turn, players.length),
        });
    };
    //change turn in start round from radio button
    const handleChange = (id) => {
        updateFireStore(docId, {
            turn: id,
        });
    };
    //get all row data
    const rowsData = [];
    for (let i = 0; i < boardSize; i++) {
        const rowData = [];
        for (let j = 0; j < boardSize; j++) {
            rowData.push(board[i * boardSize + j]);
        }
        rowsData.push(rowData);
    }
    //restart game
    const restartGame = () => {
        updateFireStore(docId, {
            board: Array(boardSize * boardSize).fill(""),
            boardSize: parseInt(boardSize),
            players: players,
            turn: 0,
            winner : "",
            winMoves : []
        });
    };
    //leave room
    const handleLeave = () => {
        //if there is only one user left in room
        if (players.length === 1) {
            firebase
                .firestore()
                .collection("rooms")
                .doc(docId)
                .delete()
                .then(() => console.log("delete"));
        } else {
            //more than one just delete player data in players
            const { playerId } = JSON.parse(
                sessionStorage.getItem("playerData")
            );
            const newPLayers = players.filter(
                (player) => player.playerId !== playerId
            );
            updateFireStore(docId, { players: newPLayers });
        }
    };
    //find winner
    const [newWinMoves, newWinner] = findWinner(board, boardSize);
    //if have winner
    if (newWinMoves)
        updateFireStore(docId, {
            winner: newWinner,
            winMoves: newWinMoves,
        });
    if (players)
        return (
            <Fragment>
                <label>Who go first : </label>
                {players.map((playerData, index) => {
                    return (
                        <Fragment key={index}>
                            <input
                                type="radio"
                                checked={turn === index}
                                onChange={() => handleChange(index)}
                            />
                            <label>
                                {index}. {playerData.username}
                            </label>
                        </Fragment>
                    );
                })}

                {
                    //game field
                    rowsData.map((rowData, index) => (
                        <Row
                            boardSize={boardSize}
                            winMoves={winMoves}
                            play={play}
                            rowData={rowData}
                            key={index}
                            rowId={index}
                            turn={turn}
                            winner={winner}
                        />
                    ))
                }
                <div>{winner}</div>
                {winMoves && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={restartGame}
                    >
                        Restart
                    </Button>
                )}
                <Button
                    onClick={handleLeave}
                    component={Link}
                    to="/"
                    variant="outlined"
                    color="primary"
                >
                    leave
                </Button>
            </Fragment>
        );
    else return <div>Loading...</div>;
}
