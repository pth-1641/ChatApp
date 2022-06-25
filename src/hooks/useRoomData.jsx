import { useState, useEffect } from 'react';
import {
    collection,
    query,
    onSnapshot,
    where,
    documentId,
} from 'firebase/firestore';
import db from '../firebase/config';

function useRoomData(roomId) {
    const [roomInfo, setRoomInfo] = useState({});

    useEffect(() => {
        const roomsRef = collection(db, 'rooms');
        const q = query(roomsRef, where(documentId(), '==', roomId));
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => setRoomInfo(doc.data()));
        });
    }, [roomId]);

    return roomInfo;
}

export default useRoomData;
