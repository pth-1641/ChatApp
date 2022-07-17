import { MdClose } from 'react-icons/md';

function Reply({ reply, members, currentUser, setDisplayReply, setReply }) {
    const { chatContent, uid, type } = reply;

    const userReply = members?.find((member) => member.uid === uid);

    return (
        <div className='text-sm relative text-white'>
            <span
                className='absolute top-0 right-0 text-xl cursor-pointer'
                onClick={() => {
                    setDisplayReply(false);
                    setReply({});
                }}
            >
                <MdClose />
            </span>
            <h4>
                Replying to{' '}
                <strong>
                    {userReply?.uid === currentUser?.uid
                        ? 'You'
                        : userReply?.nickname || userReply?.displayName}
                </strong>
            </h4>
            <p className='truncate max-w-lg text-gray-300'>
                {type === 'message' ? (
                    chatContent
                ) : (
                    <span className='capitalize'>{type?.slice(0, -1)}</span>
                )}
            </p>
        </div>
    );
}

export default Reply;
