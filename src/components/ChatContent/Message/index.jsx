import { useStore } from '../../../store';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MyMessage from './MyMessage';
import FriendMessage from './FriendMessage';
import { useMessages } from '../../../hooks';

function Message({ members, theme, setLink }) {
    const { uid } = useStore((state) => state.user) ?? '';

    const lastMessageRef = useRef();

    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const messages = useMessages(roomId, 50);
    messages.sort((a, b) => a.id - b.id);

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [roomId, messages]);

    return (
        <>
            {messages.map((message, index, listMessages) => (
                <div key={message.id} className='overflow-x-hidden'>
                    {message.uid === uid ? (
                        <MyMessage
                            message={message}
                            theme={theme}
                            setLink={setLink}
                        />
                    ) : (
                        <FriendMessage
                            members={members}
                            listMessages={listMessages}
                            index={index}
                            message={message}
                            setLink={setLink}
                        />
                    )}
                </div>
            ))}
            <div ref={lastMessageRef}></div>
        </>
    );
}

export default Message;
