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
    getDocs,
    doc,
    onSnapshot,
    limit,
} from '@firebase/firestore';
import { generateRandomColor } from '../constants/colors';

export const getUser = (uid = '') => {
    const ref = collection(db, 'users');
    const q = query(ref, where('uid', '==', uid));
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
        theme: '#2563eb',
        chatAvatar: '',
        avatarBgColor: generateRandomColor(),
        chatType,
        images: [],
        videos: [],
        files: [],
        emoji: { id: '+1', skin: 1 },
    });
};

export const updateMembers = (roomId, memberInfo, type) => {
    const { displayName, photoURL, uid, nickname, isAdmin } = memberInfo;
    const ref = doc(db, 'rooms', roomId);
    return updateDoc(ref, {
        members:
            type === 'add'
                ? arrayUnion({
                      displayName,
                      photoURL,
                      uid,
                      nickname: '',
                      isAdmin: false,
                  })
                : arrayRemove(memberInfo),
    });
};

export const addMessage = (data) => {
    const ref = doc(db, 'messages', String(new Date().getTime()));
    return setDoc(ref, {
        ...data,
    });
};

export const updateAdmin = async (roomId, mem) => {
    const ref = doc(db, 'rooms', roomId);
    await updateDoc(ref, {
        members: arrayRemove({ ...mem }),
    });
    await updateDoc(ref, {
        members: arrayUnion({ ...mem, isAdmin: true }),
    });
};

export const updateRoomToUser = (uid, roomId, type) => {
    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, {
        rooms: type === 'add' ? arrayUnion(roomId) : arrayRemove(roomId),
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
    return updateDoc(ref, {
        [mediaType]:
            type === 'add'
                ? arrayUnion({ link, fileName })
                : arrayRemove({ link, fileName }),
    });
};

export const updateGroupAvatar = (roomId, link) => {
    const ref = doc(db, 'rooms', roomId);
    return updateDoc(ref, {
        chatAvatar: link,
    });
};

export const updateGroupName = (roomId, groupName) => {
    const ref = doc(db, 'rooms', roomId);
    return updateDoc(ref, {
        roomName: groupName,
    });
};

export const updateGroupMembers = (
    roomId,
    { displayName, isAdmin, nickname, photoURL, uid }
) => {
    const ref = doc(db, 'rooms', roomId);
    return updateDoc(ref, {
        members: arrayRemove({
            displayName,
            isAdmin,
            nickname,
            photoURL,
            uid,
        }),
    });
};

export const updateEmoji = (roomId, { id, skin }) => {
    const ref = doc(db, 'rooms', roomId);
    return updateDoc(ref, {
        emoji: {
            id,
            skin,
        },
    });
};

export const isCreateRoom = (member) => {
    const ref = collection(db, 'rooms');
    const q = query(
        ref,
        where('chatType', '==', 'friend'),
        where('members', 'array-contains', member)
    );
    return getDocs(q);
};

export const removeMessage = (id) => {
    const ref = doc(db, 'messages', String(id));
    return updateDoc(ref, {
        chatContent: '',
    });
};

async function fetchData() {
    const ref = collection(db, 'messages');
    const q = query(
        ref,
        where('type', '==', 'images'),
        where('chatContent', '!=', ''),
        where('roomId', '==', '6LdyjsoQcmX8KQX6rGQt'),
        limit(2)
    );
    onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => console.log(doc.data()));
    });
}

fetchData();

// console.log(fetchData());
