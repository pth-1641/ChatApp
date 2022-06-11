import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { BsImages } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { ImAttachment } from 'react-icons/im';
import { AiOutlineGif } from 'react-icons/ai';
import { useStore } from '../../store';
import { addMessage } from '../../firebase/dbInteract';
import moment from 'moment';

function Input({ roomId, theme }) {
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
        <form className='w-full flex-center gap-3 pt-5' onSubmit={handleSubmit}>
            <div className='flex-center input-dark py-0'>
                <div className='flex-center relative'>
                    {/* <input type='file' className='absolute inset-0 opacity-0' /> */}
                    <ul
                        className='flex-center gap-2 text-xl'
                        style={{ color: theme }}
                    >
                        <li>
                            <ImAttachment />
                        </li>
                        <li>
                            <BsImages />
                        </li>
                        <li>
                            <AiOutlineGif />
                        </li>
                    </ul>
                </div>
                <input
                    type='text'
                    className='input-dark text-white'
                    placeholder='Message'
                    value={chatContent}
                    onChange={(e) => setChatContent(e.target.value)}
                />
                <span
                    className='text-xl cursor-pointer relative'
                    style={{ color: theme }}
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
            <button type='submit' className='text-2xl' style={{ color: theme }}>
                <IoSend />
            </button>
        </form>
    );
}

export default Input;
