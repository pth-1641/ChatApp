import { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRoom } from '../../firebase/functionHandler';
import db from '../../firebase/config';
import {
    collection,
    query,
    limit,
    onSnapshot,
    where,
    orderBy,
} from 'firebase/firestore';
import { formatTime } from '../../constants/moment';

function ChatItem({ roomId }) {
    const { uid } = useStore((state) => state.user);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.slice(1);

    const [friend, setFriend] = useState({});
    const [lastMessage, setLastMessage] = useState(null);
    const [{ members, avatarBgColor, chatType, roomName }, setRoom] = useState(
        {}
    );

    useEffect(() => {
        async function fetchRoomData() {
            const res = await getRoom(roomId);
            res.forEach((doc) => setRoom(doc.data()));
        }
        fetchRoomData();
    }, [lastMessage]);

    useEffect(() => {
        async function fetchLastMessage() {
            const ref = collection(db, 'messages');
            const q = query(
                ref,
                where('roomId', '==', roomId),
                where('id', '!=', ''),
                orderBy('id', 'desc'),
                limit(1)
            );
            onSnapshot(q, (snapshot) => {
                snapshot.forEach((doc) => setLastMessage(doc.data()));
            });
        }
        fetchLastMessage();
    }, []);

    useEffect(() => {
        if (chatType === 'friend') {
            const index = members.findIndex((mem) => mem.uid != uid);
            setFriend(members[index]);
        }
    }, [chatType]);

    return (
        <li
            className={`h-max py-2 px-3 rounded-xl hover:bg-lightDark duration-200 cursor-pointer ${
                roomId === id && 'active'
            }`}
            onClick={() => navigate('/' + roomId)}
        >
            <a className='flex items-center gap-3'>
                <div
                    className='rounded-full w-16 aspect-square overflow-hidden flex-center'
                    style={{ backgroundColor: avatarBgColor }}
                >
                    {chatType === 'friend' ? (
                        <img src={friend.photoURL} alt='' />
                    ) : (
                        <span className='text-white text-3xl select-none'>
                            {roomName ? roomName[0] : ''}
                        </span>
                    )}
                </div>
                <div className='flex-between flex-1 gap-3'>
                    <div className='w-36'>
                        <h4 className='text-white font-medium'>
                            {chatType === 'group'
                                ? roomName
                                : friend.nickname !== ''
                                ? friend.nickname
                                : friend.displayName}
                        </h4>
                        <p className='text-gray-400 text-sm truncate'>
                            {lastMessage
                                ? lastMessage.chatContent
                                : 'No message'}
                        </p>
                    </div>
                    <div className='text-gray-400'>
                        <time className='text-xs'>
                            {lastMessage ? formatTime(lastMessage?.time) : ''}
                        </time>
                    </div>
                </div>
            </a>
        </li>
    );
}

export default ChatItem;
