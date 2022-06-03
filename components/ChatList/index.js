import { useState, useEffect } from 'react';
import SeachInput from './SeachInput';
import Header from './Header';
import ChatItem from './ChatItem';
import { auth } from '../../firebase/config';
import { useStore } from '../../store';
import { onAuthStateChanged } from '@firebase/auth';
import { useRouter } from 'next/router';
import { getRoom, getUser } from '../../firebase/dbInteract';

function Chat() {
    const router = useRouter();

    const [rooms, setRooms] = useState([]);

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/login');
            }
        });
    }, []);

    useEffect(() => {
        async function fetchRooms() {
            // get rooms id of current user
            const roomListID = [];
            const result = await getUser(user?.uid);
            result.forEach((doc) => roomListID.push(...doc.data().rooms));
            // get room detail by id
            const roomListDetail = [];
            for (let i = 0; i < roomListID.length; ++i) {
                const roomDetail = await getRoom(roomListID[i]);
                roomDetail.forEach((doc) =>
                    roomListDetail.push({ id: doc.id, ...doc.data() })
                );
            }
            setRooms(roomListDetail);
        }
        fetchRooms();
    }, [user]);

    return (
        <>
            <Header user={user} />
            <SeachInput />
            <ul className='grid gap-1'>
                {rooms.map((room) => (
                    <ChatItem key={room.id} roomData={room} />
                ))}
            </ul>
        </>
    );
}

export default Chat;
