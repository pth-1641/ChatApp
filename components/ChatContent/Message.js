import { useStore } from '../../store';
import { formatDate } from '../../constant/moment';
import { useRef, useEffect, useState } from 'react';
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import db from '../../firebase/config';
import { useRouter } from 'next/router';

function Message({ members, theme }) {
    const { uid } = useStore((state) => state.user) ?? '';

    const [chats, setChats] = useState([]);

    const router = useRouter();
    const { roomId } = router.query;

    const sender = (uid) => {
        return members?.find((mem) => mem.uid === uid);
    };

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
            {chats?.map((chat, i, array) => (
                <div key={chat.id}>
                    {chat.uid === uid ? (
                        <div className='mt-0.5 flex flex-col items-end'>
                            {array[i - 1]?.uid !== chat.uid && (
                                <time className='text-xs text-gray-500'>
                                    {formatDate(chat.time)}
                                </time>
                            )}

                            <p
                                className='my-message relative group'
                                style={{ backgroundColor: theme }}
                            >
                                {chat.chatContent}
                                <span className='tooltip right-[calc(100%+5px)]'>
                                    {formatDate(chat.time)}
                                </span>
                            </p>
                        </div>
                    ) : (
                        <div className='mt-0.5 flex items-start gap-2'>
                            <img
                                src={sender(chat.uid)?.photoURL}
                                alt=''
                                className='w-10 aspect-square rounded-full'
                                style={{
                                    opacity:
                                        array[i - 1]?.uid !== chat.uid
                                            ? 100
                                            : 0,
                                }}
                            />
                            <div className='text-white'>
                                {array[i - 1]?.uid !== chat.uid && (
                                    <div className='flex gap-2 items-end'>
                                        <span className='text-sm'>
                                            {sender(chat.uid)?.nickname
                                                ? sender(chat.uid)?.nickname
                                                : sender(chat.uid)?.displayName}
                                        </span>
                                        <time className='text-xs text-gray-500'>
                                            {formatDate(chat.time)}
                                        </time>
                                    </div>
                                )}
                                <p className='friend-message relative group'>
                                    {chat.chatContent}
                                    <span className='tooltip left-[calc(100%+5px)]'>
                                        {formatDate(chat.time)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default Message;
