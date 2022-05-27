import db from './config';
import {
    getDocs,
    collection,
    where,
    query,
    addDoc,
} from 'firebase/firestore/lite';

export const getUser = (uid) => {
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

export const addRoom = ({ displayName, uid }) => {
    const ref = collection(db, 'rooms');
    return addDoc(ref, {
        displayName,
        uid,
    });
};
