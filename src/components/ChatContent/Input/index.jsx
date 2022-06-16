import { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { BsImages } from 'react-icons/bs';
import { MdEmojiEmotions, MdSlowMotionVideo } from 'react-icons/md';
import { ImAttachment } from 'react-icons/im';
import { AiOutlineGif } from 'react-icons/ai';
import { useStore } from '../../../store';
import { addMessage, updateMedia } from '../../../firebase/functionHandler';
import moment from 'moment';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../../firebase/config';

function Input({ roomId, theme }) {
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const [chatContent, setChatContent] = useState('');

    const { uid } = useStore((state) => state.user) ?? '';

    const handleChooseEmoji = (e) => {
        e.stopPropagation();
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chatContent) {
            addMessage({
                id: new Date().getTime(),
                roomId,
                uid,
                chatContent: chatContent.trim(),
                time: moment().toArray(),
                type: 'message',
                fileName: '',
            });
            // updateTime(uid, {roomId, updateAt: new Date().getTime()});
            setChatContent('');
        }
    };

    const uploadFile = (file, type) => {
        if (!file) return;
        const storageRef = ref(storage, `/${type}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => snapshot,
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addMessage({
                        id: new Date().getTime(),
                        roomId,
                        uid,
                        chatContent: url,
                        time: moment().toArray(),
                        type,
                        fileName: type === 'files' ? file.name : '',
                    });
                    updateMedia(roomId, type, url, file.name, 'add');
                });
            }
        );
    };
    const [emojiPicker, setEmojiPicker] = useState(null);

    return (
        <form
            className='w-full flex-center gap-3 pt-5'
            onSubmit={handleSendMessage}
        >
            <div className='flex-center input-dark py-0'>
                <ul
                    className='flex-center gap-2 text-xl'
                    style={{ color: theme }}
                >
                    <li className='flex-center relative'>
                        <ImAttachment />
                        <input
                            type='file'
                            className='absolute inset-0 opacity-0'
                            accept='.pdf, text/plain, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            onChange={(e) =>
                                uploadFile(e.target.files[0], 'files')
                            }
                        />
                    </li>
                    <li className='flex-center relative'>
                        <MdSlowMotionVideo />
                        <input
                            type='file'
                            className='absolute inset-0 opacity-0'
                            accept='video/*'
                            onChange={(e) =>
                                uploadFile(e.target.files[0], 'videos')
                            }
                        />
                    </li>
                    <li className='flex-center relative'>
                        <BsImages />
                        <input
                            type='file'
                            className='absolute inset-0 opacity-0'
                            accept='image/*'
                            onChange={(e) =>
                                uploadFile(e.target.files[0], 'images')
                            }
                        />
                    </li>
                    <li>
                        <AiOutlineGif />
                    </li>
                </ul>
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
                        ></span>
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
