import { useState, useEffect } from 'react';
import Header from './Header';
import Input from './Input';
import { useRouter } from 'next/router';
import Message from './Message';
import {
    collection,
    where,
    documentId,
    onSnapshot,
    query,
} from '@firebase/firestore';
import db from '../../firebase/config';
import Setting from './Setting';

function ChatContent() {
    const router = useRouter();
    const { roomId } = router.query;

    const [detail, setDetail] = useState({});
    const [displaySetting, setDisplaySetting] = useState(false);

    useEffect(() => {
        async function fetchRoomDetail() {
            const ref = collection(db, 'rooms');
            const q = query(ref, where(documentId(), '==', roomId ?? '0'));
            onSnapshot(q, (querySnapshot) =>
                querySnapshot.forEach((doc) => {
                    setDetail(doc.data());
                })
            );
        }
        fetchRoomDetail();
    }, [roomId]);

    return (
        <div className='h-full flex gap-3'>
            <div className='flex flex-col flex-1'>
                <Header
                    detail={detail}
                    displaySetting={displaySetting}
                    setDisplaySetting={setDisplaySetting}
                />
                <div className='relative flex-1 overflow-auto pr-2'>
                    <Message members={detail.members} theme={detail.theme} />
                </div>
                <div className=''>
                    <Input roomId={roomId} theme={detail.theme} />
                </div>
            </div>
            {displaySetting && (
                <div className='max-w-[340px] h-full flex-1 relative overflow-auto'>
                    <Setting
                        setDisplaySetting={setDisplaySetting}
                        detail={detail}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatContent;
