import React, { useEffect, useState } from "react";

import firebase from "firebase";

const fetchRealTimeFireStore = (collection) => (docId) => (WrappedComponent) => {
    const FetchRealTimeFireStore = (props) => {
        const [data, setData] = useState({});
        useEffect(() => {
            const unSub = firebase
                .firestore()
                .collection(collection)
                .doc(docId)
                .onSnapshot((snapshot) => {
                    setData(snapshot.data());
                });
            return unSub;
        }, []);
        return <WrappedComponent fireStoreData={data} {...props} />;
    };
    return FetchRealTimeFireStore;
};

export default fetchRealTimeFireStore;
