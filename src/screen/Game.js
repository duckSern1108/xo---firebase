import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import firebase from '../firebase'
const Game = () => {
    const {id} = useParams()
    const [gameData,setGameData] = useState({})
    useEffect(() => {
        const unSub  = firebase.firestore().collection('rooms').doc(id).onSnapshot(snapshot => {
            console.log(snapshot.data())
            setGameData(snapshot.data())
        })
        return unSub
    })
    const {boardSize} = gameData
    return <h1>board size : {boardSize}</h1>
}

export default Game