import { formatDate } from '../../../constants/moment';
import { MdFileDownload } from 'react-icons/md';

function FriendMessage({ messages, members, index, chat, showFullImage }) {
    const { chatContent, fileName, type, time, uid } = chat;

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
                        messages[index - 1]?.uid !== uid ? 'visible' : 'hidden',
                }}
            />
            <div className='text-white'>
                {messages[index - 1]?.uid !== uid && (
                    <div className='flex gap-2 items-end'>
                        <span className='text-sm'>
                            {sender(uid)?.nickname
                                ? sender(uid)?.nickname
                                : sender(uid)?.displayName}
                        </span>
                        <time className='text-xs text-gray-500'>
                            {formatDate(time)}
                        </time>
                    </div>
                )}
                <div className='relative group'>
                    {type === 'images' ? (
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
                        <p className='friend-message'>{chatContent}</p>
                    )}
                    <span className='tooltip left-[calc(100%+5px)] pointer-events-none'>
                        {formatDate(time)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FriendMessage;
