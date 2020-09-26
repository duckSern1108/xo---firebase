import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQe09GtMFbpJ_vvbFxid-vx6OKTSBiojI",
    authDomain: "tictactoe-6c9c3.firebaseapp.com",
    databaseURL: "https://tictactoe-6c9c3.firebaseio.com",
    projectId: "tictactoe-6c9c3",
    storageBucket: "tictactoe-6c9c3.appspot.com",
    messagingSenderId: "493542317486",
    appId: "1:493542317486:web:47f23dd839ba1a4bb8fc3f",
    measurementId: "G-10FKTYV0XB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
