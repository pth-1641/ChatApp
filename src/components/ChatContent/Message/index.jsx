import { useStore } from '../../../store';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ModalShowMedia from '../Modal/ModalShowMedia';
import MyMessage from './MyMessage';
import FriendMessage from './FriendMessage';
import useReply from '../../../hooks/useReply';
import useMessages from '../../../hooks/useMessages';

function Message({ members, theme }) {
    const { uid } = useStore((state) => state.user) ?? '';

    const lastMessageRef = useRef();
    const [showImage, setShowImage] = useState(false);
    const [link, setLink] = useState('');

    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const showFullImage = (link) => {
        setShowImage(true);
        setLink(link);
    };

    const messages = useMessages(roomId, 50);
    messages.sort((a, b) => a.id - b.id);

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [roomId, messages]);

    return (
        <>
            {showImage && (
                <ModalShowMedia
                    link={link}
                    setShowImage={setShowImage}
                    roomId={roomId}
                />
            )}
            {messages.map((message, index, listMessages) => (
                <div key={message.id} className='overflow-x-hidden'>
                    {message.uid === uid ? (
                        <MyMessage
                            listMessages={listMessages}
                            index={index}
                            message={message}
                            theme={theme}
                            showFullImage={showFullImage}
                            useReply={useReply}
                        />
                    ) : (
                        <FriendMessage
                            members={members}
                            listMessages={listMessages}
                            index={index}
                            message={message}
                            showFullImage={showFullImage}
                            useReply={useReply}
                        />
                    )}
                </div>
            ))}
            <div ref={lastMessageRef}></div>
        </>
    );
}

export default Message;
