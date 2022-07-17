import Modal from '../../ModalTemplate';
import { updateChatContent } from '../../../firebase/functionHandler';

function ModalRemoveMessage({ messageId, setDisplayRemoveMessage }) {
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
                        updateChatContent(messageId);
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
