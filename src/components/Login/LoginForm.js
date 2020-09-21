import React, { useState } from "react";

import firebase from "../../firebase";

//css
import styles from "./LoginForm.module.css";
//UI component
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import Logo
import logo from "../../images/logo.png";
import { MenuItem } from "@material-ui/core";
//import { Link } from "react-router-dom";

const StyledTextField = withStyles({
    root: {
        margin: "10px",
        width: "300px",
    },
})(TextField);
const StyledButton = withStyles({
    root: {
        margin: "10px",
    },
})(Button);
const LoginForm = ({ invited, docId, fireStoreData }) => {
    let players = [];
    if (fireStoreData) players = fireStoreData.players;

    const [roomId, setRoomId] = useState("");

    //form data + handler
    const [username, setUsername] = useState();
    const [color, setColor] = useState();
    const [boardSize, setBoardSize] = useState(5);
    const [ref, setRef] = useState("");
    const [open,setOpen] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();
        if (username && color && ref) {
            const playerData = {
                ref: ref,
                username: username,
                color: color,
                playerId: players.length,
            };
            sessionStorage.setItem("playerData", JSON.stringify(playerData));
            players.push(playerData);
            //update data to firebase
            const db = firebase.firestore().collection("rooms");
            if (!invited) {
                db.add({
                    board: Array(boardSize * boardSize).fill(""),
                    boardSize: parseInt(boardSize),
                    players: players,
                    turn: 0,
                    winner: "",
                    winMoves: [],
                }).then((data) => setRoomId(data.id));
            } else {
                db.doc(docId).update({ players: players });
            }
        } else setOpen(true);
    };
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <img src={logo} alt="logo" />
                <StyledTextField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    autoFocus
                />
                <br />
                <StyledTextField
                    select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    label="Choose your fav color"
                    variant="outlined"
                >
                    <MenuItem value="red">red</MenuItem>
                </StyledTextField>
                <br />
                <StyledTextField
                    label="Fav character"
                    type="text"
                    value={ref}
                    error={ref.length > 1}
                    onChange={(e) => setRef(e.target.value)}
                    variant="outlined"
                    helperText={ref.length > 1 && "Only 1 character accepted"}
                />
                <br />
                {!invited && (
                    <>
                        <StyledTextField
                            label="Board size"
                            type="number"
                            min={5}
                            max={100}
                            value={boardSize}
                            onChange={(e) => setBoardSize(e.target.value)}
                            variant="outlined"
                        />
                        <br />
                    </>
                )}
                <StyledButton
                    onClick={onSubmit}
                    variant="outlined"
                    color="primary"
                >
                    {invited ? "Join room" : "Create room"}
                </StyledButton>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>
                        Form is not fullfilled
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            May be you didn't fill in some field
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  color="primary" onClick={() => setOpen(false)} autoFocus>
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
                {roomId && (
                    <>
                        <StyledButton
                            component={Link}
                            to={`/${roomId}`}
                            variant="outlined"
                            color="primary"
                        >
                            join room
                        </StyledButton>
                        <p>Invite link : {`/?${roomId}`}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
