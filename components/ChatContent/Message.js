import { useStore } from '../../store';
import moment from 'moment';

function Message({ chat }) {
    // const { uid } = useStore((state) => state.user);

    return (
        <div>
            {chat?.map((content) => (
                <>
                    {content.uid === uid ? (
                        <div className='flex items-center flex-row-reverse gap-3 mt-5'>
                            <p className='my-message'>{content.content}</p>
                            <span className='text-xs text-gray-400'>
                                {moment(content.time).fromNow()}
                            </span>
                        </div>
                    ) : (
                        <div className='flex gap-3 mt-5 friend-message'>
                            {content.content}
                        </div>
                    )}
                </>
            ))}
        </div>
    );
}

export default Message;
