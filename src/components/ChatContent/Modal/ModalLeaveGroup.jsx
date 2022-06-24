import Modal from '../../Modal';
import { useStore } from '../../../store';
import {
    updateRoomToUser,
    updateGroupMembers,
} from '../../../firebase/functionHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ModalContext } from '../../../App';

function ModalLeaveGroup({ members }) {
    const { setDisplayModal } = useContext(ModalContext);

    const user = useStore((state) => state.user);
    const currentMem = members.find((member) => member.uid === user.uid);

    const navigate = useNavigate();
    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const handleLeaveGroup = () => {
        updateRoomToUser(user.docId, roomId, 'remove');
        updateGroupMembers(roomId, currentMem, 'remove');
        navigate('/');
        setDisplayModal('');
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
                    onClick={() => setDisplayModal('')}
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
