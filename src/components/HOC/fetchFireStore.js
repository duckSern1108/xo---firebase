import React, { useEffect, useState } from "react";

import firebase from "firebase";

const fetchFireStore = (collection) => (docId) => (WrappedComponent) => {
    const FetchFireStore = (props) => {
        const [data, setData] = useState({});
        useEffect(() => {
            const unSub = firebase
                .firestore()
                .collection(collection)
                .doc(docId)
                .onSnapshot((snapshot) => {
                    console.log(snapshot.data());
                    setData(snapshot.data());
                });
            return unSub;
        }, []);
        return <WrappedComponent fireStoreData={data} {...props} />;
    };
    return FetchFireStore;
};

export default fetchFireStore;
