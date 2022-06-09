import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { BsImages } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { useStore } from '../../store';
import { addMessage } from '../../firebase/dbInteract';
import moment from 'moment';

function Input({ roomId }) {
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const [chatContent, setChatContent] = useState('');

    const { uid } = useStore((state) => state.user) ?? '';

    const handleChooseEmoji = (e) => {
        e.stopPropagation();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatContent) {
            addMessage({
                id: new Date().getTime(),
                roomId,
                uid,
                chatContent: chatContent.trim(),
                time: moment().toArray(),
            });
            setChatContent('');
        }
    };

    return (
        <form
            className='w-full flex-center gap-3 absolute bottom-0'
            onSubmit={handleSubmit}
        >
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
                    value={chatContent}
                    onChange={(e) => setChatContent(e.target.value)}
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
            <button type='submit' className='text-blue-600 text-2xl'>
                <IoSend />
            </button>
        </form>
    );
}

export default Input;
