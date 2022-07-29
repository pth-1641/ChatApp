import { MdClose } from 'react-icons/md';
import { useStore } from '../store';

function Modal({ children, setDisplayRemoveMessage }) {
    const setModalName = useStore((state) => state.setModalName);

    const handleCloseModal = () => {
        setModalName('');
        setDisplayRemoveMessage && setDisplayRemoveMessage(false);
    };

    return (
        <div
            className='fixed inset-0 bg-[rgba(0,0,0,0.75)] z-20 flex-center dark:text-white p-4'
            onClick={handleCloseModal}
        >
            <span className='close-modal' onClick={handleCloseModal}>
                <MdClose />
            </span>
            <div
                className='dark:bg-dark p-5 md:p-8 rounded-xl w-full max-w-[448px] bg-white'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
