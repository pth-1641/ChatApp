import { MdClose } from 'react-icons/md';
import { useStore } from '../store';

function Modal({ children }) {
    const setModalName = useStore((state) => state.setModalName);

    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.75)] z-20 flex-center dark:text-white'>
            <span
                className='dark:bg-[#171616] dark:hover:bg-lightDark bg-gray-300 hover:bg-gray-100 absolute top-2 right-2 text-3xl p-2 rounded-full cursor-pointer duration-100'
                onClick={() => {
                    setModalName('');
                }}
            >
                <MdClose />
            </span>
            <div className='dark:bg-dark p-8 rounded-xl w-[448px] bg-white'>
                {children}
            </div>
        </div>
    );
}

export default Modal;
