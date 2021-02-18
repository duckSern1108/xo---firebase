import { InCompleteFormAlert } from "./InCompleteFormAlert";
import React, { useState ,useEffect } from "react";

import firebase from "../../firebase";

//css
import styles from "./LoginForm.module.css";
//UI component
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

//import Logo
import logo from "../../images/logo.png";
import { MenuItem } from "@material-ui/core";
import LoadingOverView from '../../components/LoadingOverView'
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
const LoginForm = ({ invited, docId}) => {
    const location = `/${docId}`
    const [data,setData] = useState({players : []})
    const [isLoading,setIsLoading] = useState(true)
    const {players} = data
    useEffect(() => {
        if (invited) {
            firebase.database().ref(location).once('value').then(snapshot => {
                setIsLoading(false)
                setData(snapshot.val())
            })
        }
        else {
            setIsLoading(false)
        }


    },[])
    const [roomId, setRoomId] = useState("");

    //form data + handler
    const [username, setUsername] = useState();
    const [color, setColor] = useState();
    const [boardSize, setBoardSize] = useState(5);
    const [ref, setRef] = useState("");
    const [open, setOpen] = useState(false);
    const onSubmit = () => {
        if (username && color && ref.length === 1) {
            const playerData = {
                ref: ref,
                username: username,
                color: color,
                playerId: players ? players.length : 0,
            };
            sessionStorage.setItem("playerData", JSON.stringify(playerData));

            if (!invited) {
                const db = firebase.database().ref().push()
                db.set({
                    board: Array(boardSize * boardSize).fill(""),
                    boardSize: parseInt(boardSize),
                    players: [playerData],
                    turn: 0,
                    winner: "",
                    winMoves: [-1],
                });
                setRoomId(db.key);
            } else {
                players.push(playerData);
                firebase.database().ref(location).update({ players: players }).then(() => window.location = `/${docId}`);
            }
        } else setOpen(true);
    };
    if (isLoading) return <LoadingOverView />
    else return (
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

                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    label="Choose your fav color"
                    variant="outlined"
                />
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
                <InCompleteFormAlert open={open} setOpen={setOpen} />
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
