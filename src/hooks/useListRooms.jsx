import { useState, useEffect } from 'react';
import db from '../firebase/config';
import { collection, query, onSnapshot, where } from '@firebase/firestore';

function useListRooms(uid) {
    const [listRoomsId, setListRoomsId] = useState([]);
    const [userDocId, setUserDocId] = useState('');

    useEffect(() => {
        const ref = collection(db, 'users');
        const q = query(ref, where('uid', '==', uid));
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setUserDocId(doc.id);
                setListRoomsId(doc.data().rooms);
            });
        });
    }, [uid]);

    return { listRoomsId, userDocId };
}

export default useListRooms;
