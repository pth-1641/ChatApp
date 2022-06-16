import { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import Header from './Header';
import ChatItem from './ChatItem';
import { auth } from '../../firebase/config';
import { useStore } from '../../store';
import { onAuthStateChanged } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import db from '../../firebase/config';

function ChatList() {
    const navigate = useNavigate();

    const [roomsID, setRoomsID] = useState([]);

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
        });
    }, []);

    useEffect(() => {
        function fetchRooms() {
            //get room's id of current user
            const ref = collection(db, 'users');
            const q = query(ref, where('uid', '==', user?.uid || ''));
            onSnapshot(q, (snapshot) => {
                const listRooms = [];
                snapshot.forEach((doc) => listRooms.push(...doc.data().rooms));
                setRoomsID(listRooms);
            });
        }
        fetchRooms();
    }, [user]);

    return (
        <>
            <Header user={user} />
            <SearchInput />
            <ul className='grid gap-1 text-white pr-2 overflow-auto'>
                {roomsID.map((room) => (
                    <ChatItem key={room.roomId} roomId={room.roomId} />
                ))}
            </ul>
        </>
    );
}

export default ChatList;
