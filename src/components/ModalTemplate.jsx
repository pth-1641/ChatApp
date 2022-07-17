import { MdClose } from 'react-icons/md';
import { useStore } from '../store';

function Modal({ children }) {
    const setModalName = useStore((state) => state.setModalName);

    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.75)] z-20 flex-center text-white'>
            <span
                className='bg-[#171616] hover:bg-lightDark absolute top-2 right-2 text-3xl p-2 rounded-full cursor-pointer'
                onClick={() => {
                    setModalName('');
                }}
            >
                <MdClose />
            </span>
            <div className='bg-dark p-8 rounded-xl w-[448px]'>{children}</div>
        </div>
    );
}

export default Modal;
