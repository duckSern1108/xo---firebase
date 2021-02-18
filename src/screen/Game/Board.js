import React, { Fragment } from "react";

import Row from "./Row";

import {
    updateTurn,
    findWinner,
    updateRealtimeData,
    deleteRoom
} from "../../ultis";

import LoadingOverView from '../../components/LoadingOverView'
import { Link } from "react-router-dom";
//import UIcomponent
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useFirebaseRealtimeDatabase from '../../Hooks/useFirebaseRealtimeDatabase'
export default function Board({ docId }) {
    const dataLocation = `/${docId}`
    const [data,isLoading] = useFirebaseRealtimeDatabase(dataLocation)
    const { boardSize, board, turn, players, winner, winMoves } = data;

    //when user draw on board
    const play = (rowId, id, ref) => {
        board[rowId * boardSize + id] = ref;
        updateRealtimeData(dataLocation, {
            board: board,
            turn: updateTurn(turn, players.length),
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
        updateRealtimeData(dataLocation,{
            board: Array(boardSize * boardSize).fill(""),
            boardSize: parseInt(boardSize),
            players: players,
            turn: 0,
            winner: "",
            winMoves: [-1],
        })
    };
    //leave room
    const handleLeave = () => {
        //if there is only one user left in room
        if (players.length === 1) {
            deleteRoom(`/${docId}`)
        } else {
            //more than one just delete player data in players
            const { playerId } = JSON.parse(
                sessionStorage.getItem("playerData")
            );
            const newPLayers = players.filter(
                (player) => player.playerId !== playerId
            );
            updateRealtimeData(`/${docId}`,{ players: newPLayers })
        }
    };
    //find winner
    const [newWinMoves, newWinner] = findWinner(board, boardSize);
    //if have winner
    if (newWinMoves)
        updateRealtimeData(`/${docId}`, {
            winner: newWinner,
            winMoves: newWinMoves,
        });
    function logPlayerName() {
        let s = ''
        players && players.forEach(({username,ref},i) =>{s+= `${username} as ${ref} \n`})
        return s
    }
    if (!isLoading)
        return (
            <Container style={{padding : "2rem 0"}}>
                <div style={{marginBottom : "2rem"}}>
                    <Typography>Players : </Typography>
                    {logPlayerName()}
                </div>
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
                            players={players}
                        />
                    ))
                }
                <Typography style={{marginTop : "2rem"}}>Winner : {winner}</Typography>
                <div >
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
                </div>

            </Container>
        );
    else return <LoadingOverView/>;
}
