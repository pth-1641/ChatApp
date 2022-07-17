import Modal from '../../ModalTemplate';
import { useStore } from '../../../store';
import {
    removeGroupMember,
    removeRoom,
} from '../../../firebase/functionHandler';
import { useLocation, useNavigate } from 'react-router-dom';

function ModalLeaveGroup({ members }) {
    const setModalName = useStore((state) => state.setModalName);
    const user = useStore((state) => state.user);
    const currentMem = members.find((member) => member.uid === user.uid);

    const navigate = useNavigate();
    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const handleLeaveGroup = () => {
        removeGroupMember(roomId, currentMem);
        removeRoom(user.docId, roomId);
        navigate('/');
        setModalName('');
    };

    return (
        <Modal>
            <h2 className='text-center text-xl font-semibold'>
                Leave group chat?
            </h2>
            <div className='flex-center gap-3 mt-8'>
                <button
                    type='button'
                    className='modal-btn'
                    onClick={() => setModalName('')}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className='modal-btn bg-red-500 hover:bg-red-600'
                    onClick={handleLeaveGroup}
                >
                    Leave Group
                </button>
            </div>
        </Modal>
    );
}

export default ModalLeaveGroup;
