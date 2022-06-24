import { useState, useEffect } from 'react';
import {
    collection,
    query,
    where,
    limit,
    onSnapshot,
    documentId,
    orderBy,
} from '@firebase/firestore';
import db from '../firebase/config';

function useMedia(roomId, type, amount) {
    const [media, setMedia] = useState([]);
    useEffect(() => {
        const q = query(
            collection(db, 'messages'),
            where('type', '==', type),
            where('roomId', '==', roomId),
            orderBy(documentId(), 'desc'),
            limit(amount)
        );
        onSnapshot(q, (snapshot) => {
            const listMedia = [];
            snapshot.forEach((doc) => {
                listMedia.push(doc.data());
            });
            setMedia(listMedia);
        });
    }, [type, amount]);

    return media;
}

export default useMedia;
