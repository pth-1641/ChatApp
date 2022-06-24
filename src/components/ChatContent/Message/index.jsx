import { useStore } from '../../../store';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ModalShowMedia from '../Modal/ModalShowMedia';
import MyMessage from './MyMessage';
import FriendMessage from './FriendMessage';
import useReply from '../../../hooks/useReply';

function Message({ members, theme, messages, setReply, setDisplayReply }) {
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

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                            setReply={setReply}
                            listMessages={listMessages}
                            index={index}
                            message={message}
                            theme={theme}
                            showFullImage={showFullImage}
                            setDisplayReply={setDisplayReply}
                            useReply={useReply}
                        />
                    ) : (
                        <FriendMessage
                            setReply={setReply}
                            members={members}
                            listMessages={listMessages}
                            index={index}
                            message={message}
                            showFullImage={showFullImage}
                            setDisplayReply={setDisplayReply}
                            useReply={useReply}
                        />
                    )}
                </div>
            ))}
            <p ref={lastMessageRef}></p>
        </>
    );
}

export default Message;
