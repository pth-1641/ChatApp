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
    deleteDoc,
} from '@firebase/firestore';
import { generateRandomColor } from '../constants/colors';

// ---------------------READ----------------------- //
export const getUser = (uid = '') => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    return getDocs(q);
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

// ---------------------CREATE----------------------- //
export const addNewUser = (userInfo) => {
    return addDoc(collection(db, 'users'), {
        ...userInfo,
    });
};

export const addNewRoom = ({ roomName, members, chatType }) => {
    return addDoc(collection(db, 'rooms'), {
        roomName,
        members,
        theme: '#2563eb',
        chatAvatar: '',
        avatarBgColor: generateRandomColor(),
        chatType,
        emoji: { id: '+1', skin: 1 },
    });
};

export const addMessage = (data) => {
    const ref = doc(db, 'messages', String(new Date().getTime()));
    return setDoc(ref, {
        ...data,
    });
};

export const addMembers = (roomId, memberInfo) => {
    const { displayName, photoURL, uid } = memberInfo;
    return updateDoc(doc(db, 'rooms', roomId), {
        members: arrayUnion({
            displayName,
            photoURL,
            uid,
            nickname: '',
            isAdmin: false,
        }),
    });
};

export const addRoomIdToUser = (uid, roomId) => {
    return updateDoc(doc(db, 'users', uid), {
        rooms: arrayUnion(roomId),
    });
};

// ---------------------UPDATE----------------------- //
export const updateAdmin = async (roomId, mem) => {
    const ref = doc(db, 'rooms', roomId);
    await updateDoc(ref, {
        members: arrayRemove({ ...mem }),
    });
    await updateDoc(ref, {
        members: arrayUnion({ ...mem, isAdmin: true }),
    });
};

export const updateTheme = (roomId, color) => {
    return updateDoc(doc(db, 'rooms', roomId), {
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

export const updateGroupAvatar = (roomId, link) => {
    return updateDoc(doc(db, 'rooms', roomId), {
        chatAvatar: link,
    });
};

export const updateGroupName = (roomId, groupName) => {
    return updateDoc(doc(db, 'rooms', roomId), {
        roomName: groupName,
    });
};

export const updateEmoji = (roomId, { id, skin }) => {
    return updateDoc(doc(db, 'rooms', roomId), {
        emoji: {
            id,
            skin,
        },
    });
};

export const updateChatContent = (messageId) => {
    return updateDoc(doc(db, 'messages', String(messageId)), {
        chatContent: '',
        replyId: '',
    });
};

// --------------------DELETE------------------------ //
export const removeGroupMember = (
    roomId,
    { displayName, isAdmin, nickname, photoURL, uid }
) => {
    return updateDoc(doc(db, 'rooms', roomId), {
        members: arrayRemove({
            displayName,
            isAdmin,
            nickname,
            photoURL,
            uid,
        }),
    });
};

async function fetchData() {
    return updateDoc(doc(db, 'users', 'LfRlsqzGD0Rflg6uaIj2'));
}

// fetchData();

// console.log(fetchData());
