import ChatList from '../components/ChatList';
import ChatContent from '../components/ChatContent';

function RoomId() {
    return (
        <div className='w-screen h-screen dark:bg-dark md:flex-center p-4 gap-6 duration-200'>
            <div className='md:max-w-[340px] h-full flex-col flex-1 hidden md:block'>
                <ChatList />
            </div>
            <div className='flex-1 h-full fixed inset-0 p-3 md:static'>
                <ChatContent />
            </div>
        </div>
    );
}

export default RoomId;
