import db from './config';
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
import { generateRandomColor } from '../constant/colors';

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
        updatedAt: new Date().getTime(),
        photos: [],
        videos: [],
        links: [],
    });
};

export const addMessage = ({ roomId, chatContent, uid, time, id }) => {
    const ref = doc(db, 'messages', String(new Date().getTime()));
    return setDoc(ref, {
        id,
        roomId,
        uid,
        chatContent,
        time,
    });
};

export const updateRoomToUser = (uid, roomID, type) => {
    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, {
        rooms: type === 'add' ? arrayUnion(roomID) : arrayRemove(roomID),
    });
};

async function fetchData() {
    const ref = collection('');
}

// fetchData();

// console.log(fetchData());
