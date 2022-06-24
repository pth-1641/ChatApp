import { useState, useEffect } from 'react';
import {
    collection,
    query,
    limit,
    onSnapshot,
    where,
    orderBy,
    documentId,
} from 'firebase/firestore';
import db from '../firebase/config';

function useRoomData(roomId, amount) {
    const [messages, setMessage] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [lastMessage, setLastMessage] = useState({});

    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('roomId', '==', roomId),
            limit(amount)
        );
        onSnapshot(q, (snapshot) => {
            const listMessages = [];
            snapshot.forEach((doc) => {
                listMessages.push({ ...doc.data(), id: doc.id });
            });
            setMessage(listMessages);
        });
    }, [roomId]);

    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('roomId', '==', roomId),
            orderBy(documentId(), 'desc'),
            limit(1)
        );
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => setLastMessage(doc.data()));
        });
    }, [roomId]);

    useEffect(() => {
        const roomsRef = collection(db, 'rooms');
        const q = query(roomsRef, where(documentId(), '==', roomId));
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => setRoomInfo(doc.data()));
        });
    }, [roomId]);

    return { roomInfo, messages, lastMessage };
}

export default useRoomData;
