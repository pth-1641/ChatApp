import Link from 'next/link';
import { useRouter } from 'next/router';

function ChatItem({ roomData }) {
    const { roomName, id, chatAvatar, avatarBgColor } = roomData;

    const router = useRouter();
    const { roomId } = router.query;

    return (
        <Link href={'/' + id}>
            <li
                className={`py-2 px-3 rounded-xl hover:bg-lightDark duration-200 cursor-pointer ${
                    roomId === id && 'active'
                }`}
            >
                <a className='flex items-center gap-3'>
                    <div
                        className={`rounded-full w-16 aspect-square overflow-hidden flex-center ${avatarBgColor}`}
                    >
                        {chatAvatar ? (
                            <img src={chatAvatar} alt='' />
                        ) : (
                            <span className='text-white text-3xl select-none'>
                                {roomName[0]}
                            </span>
                        )}
                    </div>
                    <div className='flex-between flex-1'>
                        <div>
                            <h4 className='text-white font-medium'>
                                {roomName}
                            </h4>
                            <p className='text-gray-400'>
                                Let{"'"}s meet todays?
                            </p>
                        </div>
                        <div className='text-gray-400'>
                            <time className='text-sm'>11:25</time>
                        </div>
                    </div>
                </a>
            </li>
        </Link>
    );
}

export default ChatItem;
