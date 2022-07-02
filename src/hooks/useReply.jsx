import { useState, useEffect } from 'react';
import {
    collection,
    onSnapshot,
    query,
    where,
    documentId,
} from '@firebase/firestore';
import db from '../firebase/config';

function useReply(messageId) {
    const [replyMessage, setReplyMessage] = useState('');

    useEffect(() => {
        const ref = collection(db, 'messages');
        const q = query(ref, where(documentId(), '==', messageId));
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                const type = doc.data().type;
                if (type !== 'message') {
                    setReplyMessage(type[0].toUpperCase() + type.slice(1, -1));
                } else {
                    setReplyMessage(doc.data().chatContent);
                }
            });
        });
    }, [messageId]);

    return replyMessage;
}

export default useReply;
