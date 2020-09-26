import React, { useEffect, useState } from "react";

import firebase from "firebase";

const fetchRealTimeDatabase = (dataLocation) => (WrappedComponent) => {
    const FetchRealTimeDatabase = (props) => {
        const [data, setData] = useState({});
        useEffect(() => {
            firebase.database().ref(dataLocation).on('value', snapshot => {
                console.log(snapshot.val())
                setData(snapshot.val())
            })
            return () => {
                firebase.database().ref(dataLocation).off()
            }
        }, []);
        return <WrappedComponent realTimeData={data} {...props} />;
    };
    return FetchRealTimeDatabase;
};

export default fetchRealTimeDatabase;
