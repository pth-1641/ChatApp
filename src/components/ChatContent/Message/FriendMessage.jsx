import { formatDate } from '../../../constants/moment';
import { MdFileDownload, MdReply, MdOutlineContentCopy } from 'react-icons/md';
import { useContext } from 'react';
import { ReplyContext } from '../index';
import { useReply } from '../../../hooks';
import { useStore } from '../../../store';

function FriendMessage({
    message,
    members,
    index,
    listMessages,
    setLink,
    theme,
}) {
    const { chatContent, fileName, type, time, replyId, uid } = message;
    const { setReply, setDisplayReply } = useContext(ReplyContext);
    const replyMessage = replyId ? useReply(replyId) : null;

    const setModalName = useStore((state) => state.setModalName);

    const sender = (uid) => {
        return members?.find((mem) => mem.uid === uid);
    };

    const handleShowFullScreen = (type, link) => {
        setLink({ type, link });
        setModalName('show-full-screen');
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
            <div className='dark:text-white w-full'>
                {listMessages[index - 1]?.uid !== uid && (
                    <div className='flex gap-2 items-end text-sm'>
                        {sender(uid)?.nickname
                            ? sender(uid)?.nickname
                            : sender(uid)?.displayName}
                    </div>
                )}
                {replyMessage !== null && (
                    <p
                        className='px-3 py-2 rounded-lg w-max max-w-md truncate dark:text-gray-400 text-gray-600 border-2 mb-0.5'
                        style={{ borderColor: theme }}
                    >
                        {replyMessage ? replyMessage : 'Removed Message'}
                    </p>
                )}
                <div className='flex group'>
                    {chatContent === '' ? (
                        <div className='dark:text-gray-400 text-gray-600 rounded-xl border border-gray-600 px-4 py-2'>
                            Removed Message
                        </div>
                    ) : type === 'images' || type === 'gifs' ? (
                        <img
                            src={chatContent}
                            alt=''
                            className='chat-image'
                            onClick={() => {
                                handleShowFullScreen('image', chatContent);
                            }}
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
                            <p className='friend-message'>
                                <time className='text-xs dark:text-gray-300 text-gray-700'>
                                    {formatDate(time)}
                                </time>
                                {chatContent}
                            </p>
                        </div>
                    )}
                    {chatContent !== '' && (
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
                                        navigator.clipboard.writeText(
                                            chatContent
                                        )
                                    }
                                >
                                    <MdOutlineContentCopy />
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FriendMessage;
