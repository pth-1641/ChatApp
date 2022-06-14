import { MdClose } from 'react-icons/md';

function ModalShowImage({ link, setShowImage }) {
    return (
        <div className='fixed inset-0 z-20 text-white backdrop-blur-lg' >
            <span className='absolute top-2 right-2 text-3xl rounded-full bg-[rgba(0,0,0,0.75)] p-1 cursor-pointer duration-200 hover:bg-gray-700' onClick={()=>setShowImage(false)}>
                <MdClose />
            </span>
            <img src={link} alt='' className='max-w-5xl mx-auto' />
        </div>
    );
}

export default ModalShowImage;
