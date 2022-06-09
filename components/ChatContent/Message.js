import { useStore } from '../../store';
import { formatDate } from '../../constant/moment';
import { useRef, useEffect, useState } from 'react';
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import db from '../../firebase/config';
import { useRouter } from 'next/router';

function Message({ members }) {
    const { uid } = useStore((state) => state.user) ?? '';

    const [chats, setChats] = useState([]);
    const router = useRouter();
    const { roomId } = router.query;

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

    return (
        <>
            {chats?.map((chat) => (
                <div key={chat.id}>
                    {chat.uid === uid ? (
                        <div className='flex items-center flex-row-reverse mt-0.5'>
                            <p className='my-message'>{chat.chatContent}</p>
                            <span className='text-xs text-gray-400 mx-2'>
                                {formatDate(chat.time)}
                            </span>
                        </div>
                    ) : (
                        <div className='flex items-center mt-0.5'>
                            <img src={chat.members} alt='' />
                            <p className='friend-message'>{chat.content}</p>
                            <span className='text-xs text-gray-400 mx-2'>
                                {formatDate(chat.time)}
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default Message;
