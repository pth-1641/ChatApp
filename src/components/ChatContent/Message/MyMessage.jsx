import { useState, useContext } from 'react';
import { formatDate } from '../../../constants/moment';
import {
    MdFileDownload,
    MdReply,
    MdOutlineContentCopy,
    MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import { ImReply } from 'react-icons/im';
import ModalRemoveMessage from '../Modal/ModalRemoveMessage';
import { ReplyContext } from '../index';

function MyMessage({ message, theme, showFullImage, useReply }) {
    const { chatContent, fileName, type, time, replyId } = message;
    const { setReply, setDisplayReply } = useContext(ReplyContext);

    const [displayRemoveMessage, setDisplayRemoveMessage] = useState(false);
    const replyMessage = replyId ? useReply(replyId) : null;

    return (
        <>
            <div className='flex justify-end group mt-0.5'>
                {chatContent !== '' && (
                    <div className='flex-center gap-2 text-lg mr-1 message-option text-white'>
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
                    <div className='text-gray-400 rounded-xl border border-gray-600 px-4 py-2'>
                        Removed Message
                    </div>
                ) : type === 'images' ? (
                    <img
                        src={chatContent}
                        alt=''
                        className='chat-image'
                        onClick={() => showFullImage(chatContent)}
                    />
                ) : type === 'videos' ? (
                    <video
                        src={chatContent}
                        controls
                        muted
                        className='chat-video'
                    />
                ) : type === 'files' ? (
                    <div
                        className='my-message flex flex-col items-end'
                        style={{ backgroundColor: theme }}
                    >
                        <time className='text-xs text-gray-300'>
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
                    <div className='flex flex-col items-end gap-0.5'>
                        {replyMessage && (
                            <div className='flex-center gap-2'>
                                <p className='px-3 py-2 rounded-lg w-max max-w-md truncate text-gray-400 border-2 border-gray-600'>
                                    {replyMessage
                                        ? replyMessage
                                        : 'Removed Message'}
                                </p>
                                <span className='text-white text-lg'>
                                    <ImReply />
                                </span>
                            </div>
                        )}
                        <p className='my-message' style={{ background: theme }}>
                            <time className='text-xs text-gray-300'>
                                {formatDate(time)}
                            </time>
                            {chatContent}
                        </p>
                    </div>
                )}
            </div>
            {displayRemoveMessage && (
                <ModalRemoveMessage
                    message={message}
                    setDisplayRemoveMessage={setDisplayRemoveMessage}
                />
            )}
        </>
    );
}

export default MyMessage;
