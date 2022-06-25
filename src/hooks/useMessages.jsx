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

function useMessage(roomId, amount) {
    const [messages, setMessage] = useState([]);

    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('roomId', '==', roomId),
            orderBy(documentId(), 'desc'),
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

    return messages;
}

export default useMessage;
