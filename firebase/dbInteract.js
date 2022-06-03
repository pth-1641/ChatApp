import db from './config';
import {
    collection,
    where,
    query,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    documentId,
    doc,
    getDocs,
} from '@firebase/firestore/lite';
import { onSnapshot } from '@firebase/firestore';
import { generateRandomColor } from '../constant/colors';

export const getUser = (uid = '') => {
    const ref = collection(db, 'users');
    const q = query(ref, where('uid', '==', uid));
    return getDocs(q);
};

export const addUser = ({ displayName, phoneNumber, email, photoURL, uid }) => {
    const ref = collection(db, 'users');
    return addDoc(ref, {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid,
        rooms: [],
    });
};

export const getRoom = (id = '0') => {
    const ref = collection(db, 'rooms');
    const q = query(ref, where(documentId(), '==', id));
    return getDocs(q);
};

export const addRoom = (roomName, members, chatType, chatAvatar) => {
    const ref = collection(db, 'rooms');
    return addDoc(ref, {
        roomName,
        members,
        chat: [],
        theme: 'blue',
        chatAvatar,
        avatarBgColor: generateRandomColor(),
        chatType,
    });
};

export const updateRoomToUser = (uid, roomID, type) => {
    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, {
        rooms: type === 'add' ? arrayUnion(roomID) : arrayRemove(roomID),
    });
};

// async function fetchData() {
//     const ref = collection(db, 'users');
//     const users = [];
//     const result = await getDocs(ref);
//     result.forEach((doc) => users.push(doc.data()));
//     console.log(users);
// }

// fetchData();
