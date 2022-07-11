import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import useListRooms from '../../hooks/useListRooms';
import Header from './Header';
import SearchInput from './SearchInput';
import ChatItem from './ChatItem';

function ChatList() {
    const navigate = useNavigate();

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    const { listRoomsId, userDocId } = useListRooms(user?.uid ?? '');
    const [listRoomsName, setListRoomsName] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ ...user, rooms: listRoomsId, docId: userDocId });
            } else {
                navigate('/login');
            }
        });
    }, [listRoomsId]);

    return (
        <>
            <Header user={user} />
            <SearchInput />
            <ul className='grid gap-1 text-white pr-2 overflow-auto'>
                {listRoomsId?.map((roomId) => (
                    <ChatItem
                        key={roomId}
                        roomId={roomId}
                        setListRoomsName={setListRoomsName}
                    />
                ))}
            </ul>
        </>
    );
}

export default ChatList;
