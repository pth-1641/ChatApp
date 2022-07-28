import { useState, useContext } from 'react';
import { formatDate } from '../../../constants/moment';
import {
    MdFileDownload,
    MdReply,
    MdOutlineContentCopy,
    MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import ModalRemoveMessage from '../Modals/ModalRemoveMessage';
import { ReplyContext } from '../index';
import { useReply } from '../../../hooks';
import { useStore } from '../../../store';

function MyMessage({ message, theme, setLink }) {
    const { chatContent, fileName, type, time, replyId } = message;
    const { setReply, setDisplayReply } = useContext(ReplyContext);

    const [displayRemoveMessage, setDisplayRemoveMessage] = useState(false);
    const replyMessage = replyId ? useReply(replyId) : null;

    const setModalName = useStore((state) => state.setModalName);

    const handleShowFullScreen = (type, link) => {
        setLink({ type, link });
        setModalName('show-full-screen');
    };

    return (
        <>
            {replyMessage !== null && (
                <p
                    className='px-3 py-2 rounded-lg w-56 md:max-w-md truncate dark:text-gray-200 text-black bg-gray-200 dark:bg-lightDark border-2 ml-auto mt-0.5'
                    style={{ borderColor: theme }}
                >
                    {replyMessage ? replyMessage : 'Removed Message'}
                </p>
            )}
            <div className='flex justify-end group mt-0.5 max-w-[80%] ml-auto'>
                {chatContent !== '' && (
                    <div className='flex-center gap-2 text-lg mr-1 message-option dark:text-white'>
                        <span
                            className='cursor-pointer'
                            onClick={() => setDisplayRemoveMessage(true)}
                        >
                            <MdOutlineRemoveCircleOutline />
                        </span>
                        {type === 'message' && (
                            <span
                                className='cursor-pointer'
                                onClick={() => {
                                    navigator.clipboard.writeText(chatContent);
                                }}
                            >
                                <MdOutlineContentCopy />
                            </span>
                        )}
                        <span
                            className='cursor-pointer'
                            onClick={() => {
                                setReply(message);
                                setDisplayReply(true);
                            }}
                        >
                            <MdReply />
                        </span>
                    </div>
                )}
                {chatContent === '' ? (
                    <div className='dark:text-gray-400 text-gray-600 rounded-xl border border-gray-600 px-4 py-2'>
                        Removed Message
                    </div>
                ) : type === 'message' ? (
                    <div className='flex flex-col items-end gap-0.5'>
                        <p className='my-message' style={{ background: theme }}>
                            <time className='text-xs dark:text-gray-300 text-200'>
                                {formatDate(time)}
                            </time>

                            {chatContent}
                        </p>
                    </div>
                ) : type === 'videos' ? (
                    <video
                        src={chatContent}
                        controls
                        muted
                        className='chat-video'
                    />
                ) : type === 'files' ? (
                    <div
                        className='my-message flex flex-col items-end w-max'
                        style={{ backgroundColor: theme }}
                    >
                        <time className='text-xs dark:text-gray-300 text-200'>
                            {formatDate(time)}
                        </time>
                        <a
                            className='flex-center underline'
                            href={chatContent}
                            download
                            target='_blank'
                        >
                            {fileName}
                            <span className='text-2xl ml-2'>
                                <MdFileDownload />
                            </span>
                        </a>
                    </div>
                ) : (
                    <img
                        src={chatContent}
                        alt=''
                        className='chat-image'
                        onClick={() =>
                            handleShowFullScreen('image', chatContent)
                        }
                    />
                )}
            </div>
            {displayRemoveMessage && (
                <ModalRemoveMessage
                    messageId={message.id}
                    setDisplayRemoveMessage={setDisplayRemoveMessage}
                />
            )}
        </>
    );
}

export default MyMessage;
