import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '../../store';
import { getRoom } from '../../firebase/dbInteract';
import { formatTime } from '../../constant/moment';
import { useRouter } from 'next/router';

function ChatItem({ roomId }) {
    const { uid } = useStore((state) => state.user);

    const router = useRouter();
    const id = router.query.roomId;

    const [{ members, avatarBgColor, chatType, roomName }, setRoom] = useState(
        {}
    );
    const [friend, setFriend] = useState({});

    useEffect(() => {
        async function fetchRoomData() {
            const res = await getRoom(roomId);
            res.forEach((doc) => setRoom(doc.data()));
        }
        fetchRoomData();
    }, []);

    useEffect(() => {
        if (chatType === 'friend') {
            const index = members.findIndex((mem) => mem.uid != uid);
            setFriend(members[index]);
        }
    }, [chatType]);

    return (
        <Link href={'/' + roomId}>
            <li
                className={`py-2 px-3 rounded-xl hover:bg-lightDark duration-200 cursor-pointer ${
                    roomId === id && 'active'
                }`}
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
                    <div className='flex-between flex-1'>
                        <div>
                            <h4 className='text-white font-medium'>
                                {roomName}
                            </h4>
                            <p className='text-gray-400 text-sm'>No message</p>
                        </div>
                        <div className='text-gray-400'>
                            <time className='text-xs'></time>
                        </div>
                    </div>
                </a>
            </li>
        </Link>
    );
}

export default ChatItem;
