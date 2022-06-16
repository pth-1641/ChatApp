import { formatDate } from '../../../constants/moment';
import { MdFileDownload } from 'react-icons/md';

function MyMessage({ messages, index, chat, theme, showFullImage }) {
    const { chatContent, fileName, type, time, uid } = chat;

    return (
        <div className='mt-0.5 flex flex-col items-end'>
            {messages[index - 1]?.uid !== uid && (
                <time className='text-xs text-gray-500'>
                    {formatDate(time)}
                </time>
            )}
            <div className='group relative'>
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
                        className='my-message flex-center underline'
                        style={{ backgroundColor: theme }}
                        href={chatContent}
                        download
                    >
                        {fileName}
                        <span className='text-2xl ml-2'>
                            <MdFileDownload />
                        </span>
                    </a>
                ) : (
                    <p
                        className='my-message'
                        style={{ backgroundColor: theme }}
                    >
                        {chat.chatContent}
                    </p>
                )}
                <span className='tooltip right-[calc(100%+5px)] pointer-events-none'>
                    {formatDate(chat.time)}
                </span>
            </div>
        </div>
    );
}

export default MyMessage;
