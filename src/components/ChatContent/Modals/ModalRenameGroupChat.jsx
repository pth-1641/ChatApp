import { useState } from 'react';
import ModalTemplate from '../../ModalTemplate';
import { updateGroupName } from '../../../firebase/functionHandler';
import { useStore } from '../../../store';

function ModalRenameGroupChat({ roomId, roomName }) {
    const [newChatName, setNewChatName] = useState(roomName);
    const setModalName = useStore((state) => state.setModalName);

    const handleUpdateGroupName = () => {
        if (newChatName !== roomName) {
            updateGroupName(roomId, newChatName);
        }
        setModalName('');
    };

    return (
        <ModalTemplate>
            <h2 className='text-center text-xl font-semibold border-b border-gray-600 pb-2'>
                Change chat name
            </h2>
            <input
                type='text'
                value={newChatName}
                className='input-dark rounded-lg my-3'
                onChange={(e) => setNewChatName(e.target.value)}
            />
            <div className='flex items-center justify-end gap-1 mt-2'>
                <button
                    type='button'
                    className='modal-btn text-black'
                    onClick={() => setModalName('')}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className='modal-btn bg-teal-500 hover:bg-teal-600'
                    onClick={handleUpdateGroupName}
                >
                    Save
                </button>
            </div>
        </ModalTemplate>
    );
}

export default ModalRenameGroupChat;
