import React, { useEffect, useState } from "react";

import firebase from "firebase";

const fetchRealTimeDatabase = (dataLocation) => (WrappedComponent) => {
    const FetchRealTimeDatabase = (props) => {
        const [data, setData] = useState({});
        useEffect(() => {
            const db = firebase.database().ref(dataLocation)
            db.on('value', snapshot => {
                console.log(snapshot.val())
                setData(snapshot.val())
            })
            db.onDisconnect().remove()
            return () => {
                db.off()
            }
        }, []);
        return <WrappedComponent realTimeData={data} {...props} />;
    };
    return FetchRealTimeDatabase;
};

export default fetchRealTimeDatabase;
