import { useEffect } from 'react';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useListRooms } from '../../hooks';
import Header from './Header';
import SearchInput from './SearchInput';
import ChatItem from './ChatItem';
import ModalInfo from './Modals/ModalInfo';
import ModalSignOut from './Modals/ModalSignOut';
import ModalConversation from './Modals/ModalConversation';

function ChatList() {
    const navigate = useNavigate();

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const modalName = useStore((state) => state.modalName);

    const { listRoomsId, userDocId } = useListRooms(user?.uid ?? '');

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
                    <ChatItem key={roomId} roomId={roomId} />
                ))}
            </ul>
            {modalName === 'user-info' && <ModalInfo user={user} />}
            {modalName === 'log-out' && <ModalSignOut />}
            {modalName === 'create-new-chat' && <ModalConversation />}
        </>
    );
}

export default ChatList;
