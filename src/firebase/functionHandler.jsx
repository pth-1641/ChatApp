import db from './config';
import { storage } from './config';
import {
    collection,
    where,
    query,
    addDoc,
    updateDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
    documentId,
    getDocs,
    doc,
} from '@firebase/firestore';
import { generateRandomColor } from '../constants/colors';

export const getUser = (uid = '') => {
    const ref = collection(db, 'users');
    const q = query(ref, where('uid', '==', uid));
    return getDocs(q);
};

export const getRoom = (id) => {
    const ref = collection(db, 'rooms');
    const q = query(ref, where(documentId(), '==', id));
    return getDocs(q);
};

export const addNewUser = ({
    displayName,
    phoneNumber,
    email,
    photoURL,
    uid,
}) => {
    const ref = collection(db, 'users');
    return addDoc(ref, {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid,
    });
};

export const addRoom = ({ roomName, members, chatType }) => {
    const ref = collection(db, 'rooms');
    return addDoc(ref, {
        roomName,
        members,
        theme: '#3b82f6',
        chatAvatar: '',
        avatarBgColor: generateRandomColor(),
        chatType,
        images: [],
        videos: [],
        files: [],
    });
};

export const addMessage = ({
    roomId,
    chatContent,
    uid,
    time,
    id,
    type,
    fileName,
}) => {
    const ref = doc(db, 'messages', String(new Date().getTime()));
    return setDoc(ref, {
        id,
        roomId,
        uid,
        chatContent,
        time,
        fileName,
        type,
    });
};

export const updateRoomToUser = (uid, roomId, type) => {
    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, {
        rooms:
            type === 'add'
                ? arrayUnion({ roomId, updateAt: new Date().getTime() })
                : arrayRemove({ roomId, updateAt: new Date().getTime() }),
    });
};

export const updateTheme = (roomId, color) => {
    const ref = doc(db, 'rooms', roomId);
    return updateDoc(ref, {
        theme: color,
    });
};

export const updateNickname = async (roomId, oldNickname, newNickname) => {
    const ref = doc(db, 'rooms', roomId);
    await updateDoc(ref, {
        members: arrayUnion(newNickname),
    });
    await updateDoc(ref, {
        members: arrayRemove(oldNickname),
    });
};

export const updateMedia = (roomId, mediaType, link, fileName, type) => {
    const ref = doc(db, 'rooms', roomId);
    if (mediaType === 'files') {
        return updateDoc(ref, {
            files:
                type === 'add'
                    ? arrayUnion({ link, fileName })
                    : arrayRemove({ link, fileName }),
        });
    }
    return updateDoc(ref, {
        [mediaType]: type === 'add' ? arrayUnion(link) : arrayRemove(link),
    });
};

export const updateTime = (uid, oldTime, newTime) => {
    // await updateDoc(ref, {
    //     rooms: arrayUnion(newTime),
    // });
    // await updateDoc(ref, {
    //     members: arrayRemove(oldTime),
    // });
};

async function fetchData() {
    const cityRef = doc(db, 'cities', 'poIaZ6eGli8TGpKWKTO');
    setDoc(cityRef, { capital: true }, { merge: true });
}

// fetchData();

// console.log(fetchData());
