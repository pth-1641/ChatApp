import { MdClose } from 'react-icons/md';

function Modal({ children, setDisplayModal }) {
    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.75)] z-20 flex-center text-white'>
            <span
                className='bg-[#171616] hover:bg-lightDark absolute top-2 right-2 text-3xl p-2 rounded-full cursor-pointer'
                onClick={() => setDisplayModal('')}
            >
                <MdClose />
            </span>
            <div className='bg-dark p-8 rounded-xl max-w-md'>{children}</div>
        </div>
    );
}

export default Modal;
