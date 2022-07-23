import ChatList from '../components/ChatList';

function Home() {
    return (
        <div className='w-screen h-screen dark:bg-dark flex-center p-4 gap-6 duration-200'>
            <div className='max-w-[340px] h-full flex flex-col flex-1'>
                <ChatList />
            </div>
            <div className='flex-center dark:text-gray-300 text-xl flex-1'>
                <h1>Select a conversation and start chatting now!</h1>
            </div>
        </div>
    );
}

export default Home;
