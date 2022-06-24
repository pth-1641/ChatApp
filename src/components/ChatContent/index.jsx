import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoomData from '../../hooks/useRoomData';
import Header from './Header';
import Message from './Message';
import Reply from './Reply';
import Input from './Input';
import Setting from './Setting';
import { useStore } from '../../store';

function ChatContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const user = useStore((state) => state.user);

    const [displaySetting, setDisplaySetting] = useState(false);
    const [reply, setReply] = useState({});
    const [displayReply, setDisplayReply] = useState(false);

    const { roomInfo } = useRoomData(roomId);
    let { messages } = useRoomData(roomId, 50);

    useEffect(() => {
        if (!user?.rooms.includes(roomId)) {
            navigate('/error/404');
        }
    }, [roomId]);

    return (
        <div className='h-full flex gap-3'>
            <div className='flex flex-col flex-1'>
                <Header
                    roomInfo={roomInfo}
                    displaySetting={displaySetting}
                    setDisplaySetting={setDisplaySetting}
                />
                <div className='relative flex-1 overflow-auto pr-2'>
                    <Message
                        members={roomInfo.members}
                        theme={roomInfo.theme}
                        messages={messages}
                        setReply={setReply}
                        setDisplayReply={setDisplayReply}
                    />
                </div>
                <Reply
                    reply={reply}
                    members={roomInfo.members}
                    currentUser={user}
                    displayReply={displayReply}
                    setDisplayReply={setDisplayReply}
                    setReply={setReply}
                />
                <Input
                    roomId={roomId}
                    theme={roomInfo.theme}
                    emoji={roomInfo.emoji}
                    reply={reply}
                    setDisplayReply={setDisplayReply}
                    setReply={setReply}
                />
            </div>
            {displaySetting && (
                <div className='max-w-[300px] h-full flex-1 relative overflow-auto'>
                    <Setting
                        setDisplaySetting={setDisplaySetting}
                        roomInfo={roomInfo}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatContent;
