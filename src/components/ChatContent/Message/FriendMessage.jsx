import { formatDate } from '../../../constants/moment';
import { MdFileDownload, MdReply, MdOutlineContentCopy } from 'react-icons/md';
import { useContext } from 'react';
import { ReplyContext } from '../index';
import useReply from '../../../hooks/useReply';
import { ImReply } from 'react-icons/im';

function FriendMessage({
    message,
    members,
    index,
    listMessages,
    showFullImage,
}) {
    const { chatContent, fileName, type, time, replyId, uid } = message;
    const { setReply, setDisplayReply } = useContext(ReplyContext);
    const replyMessage = replyId ? useReply(replyId) : null;

    const sender = (uid) => {
        return members?.find((mem) => mem.uid === uid);
    };

    return (
        <div className='mt-0.5 flex items-start gap-2'>
            <img
                src={sender(uid)?.photoURL}
                alt=''
                className='w-10 aspect-square rounded-full'
                style={{
                    visibility:
                        listMessages[index - 1]?.uid !== uid
                            ? 'visible'
                            : 'hidden',
                }}
            />
            <div className='text-white w-full'>
                {listMessages[index - 1]?.uid !== uid && (
                    <div className='flex gap-2 items-end text-sm'>
                        {sender(uid)?.nickname
                            ? sender(uid)?.nickname
                            : sender(uid)?.displayName}
                    </div>
                )}
                <div className='flex group'>
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
                        <a
                            className='friend-message flex-center underline'
                            href={chatContent}
                            download
                        >
                            {fileName}
                            <span className='text-2xl ml-2'>
                                <MdFileDownload />
                            </span>
                        </a>
                    ) : (
                        <div className='flex flex-col gap-0.5'>
                            {replyMessage && (
                                <div className='flex-center gap-2'>
                                    <span className='text-white text-lg scale-x-[-1]'>
                                        <ImReply />
                                    </span>
                                    <p className='px-3 py-2 rounded-lg w-max max-w-md truncate text-gray-400 border-2 border-gray-600'>
                                        {replyMessage
                                            ? replyMessage
                                            : 'Removed Message'}
                                    </p>
                                </div>
                            )}
                            <p className='friend-message' X>
                                <time className='text-xs text-gray-300'>
                                    {formatDate(time)}
                                </time>
                                {chatContent}
                            </p>
                        </div>
                    )}
                    <div className='flex-center gap-2 text-lg ml-1 message-option'>
                        <span
                            className='cursor-pointer'
                            onClick={() => {
                                setReply(message);
                                setDisplayReply(true);
                            }}
                        >
                            <MdReply />
                        </span>
                        {type === 'message' && (
                            <span
                                className='cursor-pointer'
                                onClick={() =>
                                    navigator.clipboard.writeText(chatContent)
                                }
                            >
                                <MdOutlineContentCopy />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendMessage;
