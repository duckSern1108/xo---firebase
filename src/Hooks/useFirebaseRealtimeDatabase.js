import { useEffect, useState } from "react";

import firebase from "../firebase";

const useFirebaseRealtimeDatabase = (dataLocation) => {
    const [data, setData] = useState({});
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        const db = firebase.database().ref(dataLocation)
        db.on('value', snapshot => {
            //console.log(snapshot.val())
            setIsLoading(false)
            setData(snapshot.val())
            if (snapshot.val().players.length === 1) db.onDisconnect().remove()
        })

        return () => {
            db.off()
        }
    }, []);
    return [data,isLoading]
};

export default useFirebaseRealtimeDatabase
