import Modal from '../../Modal';
import { removeMessage, updateMedia } from '../../../firebase/functionHandler';

function ModalRemoveMessage({ message, setDisplayRemoveMessage }) {
    const { id, fileName, chatContent, roomId, type } = message;

    return (
        <Modal setDisplayRemoveMessage={setDisplayRemoveMessage}>
            <h1 className='font-semibold text-xl'>
                Do you want to remove this message?
            </h1>
            <div className='flex-center gap-3 mt-4'>
                <button
                    className='modal-btn'
                    onClick={() => setDisplayRemoveMessage(false)}
                >
                    Cancel
                </button>
                <button
                    className='modal-btn bg-red-500 hover:bg-red-600'
                    onClick={() => {
                        removeMessage(id);
                        updateMedia(
                            roomId,
                            type,
                            chatContent,
                            fileName,
                            'remove'
                        );
                        setDisplayRemoveMessage(false);
                    }}
                >
                    Remove
                </button>
            </div>
        </Modal>
    );
}

export default ModalRemoveMessage;
