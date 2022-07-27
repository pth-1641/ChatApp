import { useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useRoomData } from '../../hooks';
import Header from './Header';
import Message from './Message';
import Reply from './Reply';
import Input from './Input';
import Setting from './Setting';
import { useStore } from '../../store';
import ModalShowMedia from './Modals/ModalShowMedia';
import ModalShowAllMedia from './Modals/ModalShowAllMedia';
import ModalRole from './Modals/ModalRole';
import ModalLeaveGroup from './Modals/ModalLeaveGroup';
import ModalRenameGroupChat from './Modals/ModalRenameGroupChat';
import ModalNickname from './Modals/ModalNickname';

export const ReplyContext = createContext();

function ChatContent() {
    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const user = useStore((state) => state.user);
    const modalName = useStore((state) => state.modalName);

    const [displaySetting, setDisplaySetting] = useState(false);
    const [reply, setReply] = useState({});
    const [displayReply, setDisplayReply] = useState(false);
    const [link, setLink] = useState({});

    const roomInfo = useRoomData(roomId);
    const { members, roomName } = roomInfo;

    return (
        <ReplyContext.Provider value={{ setReply, setDisplayReply }}>
            <div className='h-full flex gap-3 relative'>
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
                            setLink={setLink}
                        />
                    </div>
                    <div className='p-2'>
                        {displayReply && (
                            <Reply
                                reply={reply}
                                members={roomInfo.members}
                                currentUser={user}
                                setReply={setReply}
                                setDisplayReply={setDisplayReply}
                            />
                        )}
                    </div>
                    <Input
                        roomId={roomId}
                        theme={roomInfo.theme}
                        emoji={roomInfo.emoji}
                        reply={reply}
                        setReply={setReply}
                        setDisplayReply={setDisplayReply}
                    />
                </div>
                {displaySetting && (
                    <div className='lg:max-w-[300px] h-full flex-1 lg:relative overflow-auto fixed inset-0 dark:bg-dark bg-white md:absolute'>
                        <Setting
                            setDisplaySetting={setDisplaySetting}
                            roomInfo={roomInfo}
                            setLink={setLink}
                        />
                    </div>
                )}
            </div>
            {/* Modals*/}
            {modalName === 'nickname' && <ModalNickname members={members} />}
            {modalName === 'show-full-screen' && <ModalShowMedia link={link} />}
            {modalName === 'media' && (
                <ModalShowAllMedia roomId={roomId} setLink={setLink} />
            )}
            {modalName === 'role' && (
                <ModalRole members={members} roomId={roomId} />
            )}
            {modalName === 'leave-group' && (
                <ModalLeaveGroup members={members} />
            )}
            {modalName === 'rename' && (
                <ModalRenameGroupChat roomId={roomId} roomName={roomName} />
            )}
        </ReplyContext.Provider>
    );
}

export default ChatContent;
