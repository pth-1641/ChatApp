import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { MdInfo, MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Header({ roomInfo, setDisplaySetting, displaySetting }) {
    const { roomName, avatarBgColor, chatType, members, theme, chatAvatar } =
        roomInfo;

    const navigate = useNavigate();

    const user = useStore((state) => state.user);
    const [friend, setFriend] = useState({});

    useEffect(() => {
        if (chatType === 'friend') {
            const index = members.findIndex((mem) => mem.uid != user.uid);
            setFriend(members[index]);
        }
    }, [roomInfo]);

    return (
        <header className='w-full flex-between pb-2'>
            <div className='flex-center gap-3'>
                <span
                    className='text-2xl md:hidden'
                    style={{ color: theme }}
                    onClick={() => navigate('/')}
                >
                    <MdArrowBackIosNew />
                </span>
                <div
                    className='rounded-full w-12 aspect-square overflow-hidden flex-center'
                    style={{ backgroundColor: avatarBgColor }}
                >
                    {chatType === 'friend' ? (
                        <img src={friend.photoURL} alt='' />
                    ) : chatAvatar ? (
                        <img
                            className='w-full h-full object-cover'
                            src={chatAvatar}
                            alt=''
                        />
                    ) : (
                        <span className='text-white text-3xl select-none'>
                            {roomName ? roomName[0] : ''}
                        </span>
                    )}
                </div>
                <h4 className='dark:text-white font-medium'>
                    {chatType === 'friend'
                        ? friend.nickname || friend.displayName
                        : roomName}
                </h4>
            </div>
            {!displaySetting && (
                <span
                    style={{ color: theme }}
                    className='text-2xl cursor-pointer'
                    onClick={() => setDisplaySetting(true)}
                >
                    <MdInfo />
                </span>
            )}
        </header>
    );
}

export default Header;
