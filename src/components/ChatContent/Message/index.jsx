import { useStore } from '../../../store';
import { useRef, useEffect, useState } from 'react';
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import db from '../../../firebase/config';
import { useLocation } from 'react-router-dom';
import ModalShowMedia from '../Modal/ModalShowMedia';
import MyMessage from './MyMessage';
import FriendMessage from './FriendMessage';

function Message({ members, theme }) {
    const { uid } = useStore((state) => state.user) ?? '';
    const endRef = useRef();

    const [chats, setChats] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [link, setLink] = useState('');

    const location = useLocation();
    const roomId = location.pathname.slice(1);

    useEffect(() => {
        async function fetchMessages() {
            const ref = collection(db, 'messages');
            const q = query(ref, where('roomId', '==', roomId ?? ''));
            onSnapshot(q, (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push(doc.data());
                });
                setChats(messages);
            });
        }
        fetchMessages();
    }, [roomId]);

    const showFullImage = (link) => {
        setShowImage(true);
        setLink(link);
    };

    return (
        <>
            {showImage && (
                <ModalShowMedia
                    link={link}
                    setShowImage={setShowImage}
                    roomId={roomId}
                />
            )}
            {chats?.map((chat, i, messages) => (
                <div key={chat.id} className='overflow-x-hidden'>
                    {chat.uid === uid ? (
                        <MyMessage
                            messages={messages}
                            index={i}
                            chat={chat}
                            theme={theme}
                            showFullImage={showFullImage}
                        />
                    ) : (
                        <FriendMessage
                            members={members}
                            messages={messages}
                            index={i}
                            chat={chat}
                            showFullImage={showFullImage}
                        />
                    )}
                </div>
            ))}
            <div ref={endRef}></div>
        </>
    );
}

export default Message;
