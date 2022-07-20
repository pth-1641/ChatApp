import { MdClose } from 'react-icons/md';
import { useStore } from '../../../store';

function ModalShowImage({ link }) {
    const setModalName = useStore((state) => state.setModalName);

    return (
        <div className='fixed inset-0 z-20 text-white backdrop-blur-lg flex-center p-7'>
            <span
                className='absolute top-2 right-2 text-3xl rounded-full bg-[rgba(0,0,0,0.75)] p-1 cursor-pointer duration-200 hover:bg-gray-700'
                onClick={() => setModalName('')}
            >
                <MdClose />
            </span>
            {link.type === 'video' ? (
                <video
                    src={link.link}
                    className='h-full mx-auto rounded-lg'
                    controls
                    autoPlay
                />
            ) : (
                <img
                    src={link.link}
                    alt=''
                    className='h-full mx-auto rounded-lg'
                />
            )}
        </div>
    );
}

export default ModalShowImage;
