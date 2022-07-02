import { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatTime } from '../../constants/moment';
import useRoomData from '../../hooks/useRoomData';
import useMessages from '../../hooks/useMessages';

function ChatItem({ roomId }) {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.slice(1);

    const { uid } = useStore((state) => state.user);

    const [friend, setFriend] = useState({});
    const [sender, setSender] = useState('');
    const roomInfo = useRoomData(roomId);
    const messages = useMessages(roomId, 1);

    const { chatContent, time, type } = messages[0] ?? {};
    const { members, avatarBgColor, chatType, roomName, chatAvatar } = roomInfo;

    useEffect(() => {
        if (chatType === 'friend') {
            const index = members.findIndex((mem) => mem.uid != uid);
            setFriend(members[index]);
        }
    }, [roomInfo]);

    useEffect(() => {
        if (messages[0]?.uid === uid) {
            setSender('You');
        } else {
            const memberSender = members?.find(
                (mem) => mem.uid === messages[0]?.uid
            );

            memberSender?.nickname
                ? setSender(memberSender?.nickname)
                : setSender(memberSender?.displayName.split(' ')[0]);
        }
    }, [messages, roomInfo]);

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
                    ) : chatAvatar ? (
                        <img
                            src={chatAvatar}
                            alt=''
                            className='h-full w-full object-cover'
                        />
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
                                : friend.nickname
                                ? friend.nickname
                                : friend.displayName}
                        </h4>
                        <p className='text-gray-400 text-sm truncate'>
                            {sender}
                            {chatContent === ''
                                ? ' unsent a message'
                                : type === 'images'
                                ? ' sent an image'
                                : type === 'videos'
                                ? ' sent a video'
                                : chatContent
                                ? `: ${chatContent}`
                                : 'No message'}
                        </p>
                    </div>
                    <div className='text-gray-400'>
                        <time className='text-xs'>
                            {time?.length && formatTime(time)}
                        </time>
                    </div>
                </div>
            </a>
        </li>
    );
}

export default ChatItem;
