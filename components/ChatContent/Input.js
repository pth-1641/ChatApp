import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { BsImages } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';

function Input() {
    const [displayEmoji, setDisplayEmoji] = useState(false);

    const handleChooseEmoji = (e) => {
        e.stopPropagation();
    };

    return (
        <div className='w-full flex-center gap-3 absolute bottom-0'>
            <div className='flex-center input-dark py-0'>
                <div className='flex-center relative'>
                    <input type='file' className='absolute inset-0 opacity-0' />
                    <span className='text-white text-xl'>
                        <BsImages />
                    </span>
                </div>
                <input
                    type='text'
                    className='input-dark text-white'
                    placeholder='Message'
                />
                <span
                    className='text-white text-xl cursor-pointer relative'
                    onClick={() => setDisplayEmoji(!displayEmoji)}
                >
                    <MdEmojiEmotions />
                    {displayEmoji && (
                        <span
                            className='absolute right-0 bottom-12'
                            onClick={handleChooseEmoji}
                        >
                            <div className='bg-black w-64 h-64'></div>
                        </span>
                    )}
                </span>
            </div>
            <button type='button' className='text-blue-600 text-2xl'>
                <IoSend />
            </button>
        </div>
    );
}

export default Input;
