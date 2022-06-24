import { useState } from 'react';
import { formatDate } from '../../../constants/moment';
import {
    MdFileDownload,
    MdReply,
    MdOutlineContentCopy,
    MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import ModalRemoveMessage from '../Modal/ModalRemoveMessage';

function MyMessage({
    message,
    theme,
    showFullImage,
    setReply,
    setDisplayReply,
    useReply,
}) {
    const { chatContent, fileName, type, time, id, replyId } = message;
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
                    <div className='text-white relative'>
                        {replyMessage !== null && (
                            <p className='bg-lightDark px-3 py-2 rounded-lg w-max relative top-2 ml-auto max-w-md truncate text-gray-400'>
                                {replyMessage
                                    ? replyMessage
                                    : 'Removed Message'}
                            </p>
                        )}
                        <p
                            className='my-message flex flex-col items-end relative ml-auto'
                            style={{ backgroundColor: theme }}
                        >
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
