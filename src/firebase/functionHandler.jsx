import db from './config';
import {
    collection,
    where,
    query,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDocs,
    doc,
    setDoc,
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

export const removeRoom = (docId, roomId) => {
    return updateDoc(doc(db, 'users', docId), {
        rooms: arrayRemove(roomId),
    });
};

export const removeMember = (roomId, memberInfo) => {
    return updateDoc(doc(db, 'rooms', roomId), {
        members: arrayRemove(memberInfo),
    });
};

async function fetchData() {
    const ref = doc(db, 'rooms', '17hxUeheBDT1wXKJbbo9');
    return updateDoc(ref, {
        rooms: arrayRemove({
            displayName: 'hung',
            isAdmin: false,
            nickname: '',
            photoURL:
                'https://images.unsplash.com/photo-1657998623149-8bb43c02e20d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
            uid: '123',
        }),
    });
}

// fetchData();

// console.log(fetchData());
