import ChatList from '../components/ChatList';
import ChatContent from '../components/ChatContent';

function RoomId() {
    return (
        <div className='w-screen h-screen bg-dark flex-center p-4 gap-6'>
            <div className='max-w-[340px] h-full flex flex-col flex-1'>
                <ChatList />
            </div>
            <div className='flex-1 h-full'>
                <ChatContent />
            </div>
        </div>
    );
}

export default RoomId;