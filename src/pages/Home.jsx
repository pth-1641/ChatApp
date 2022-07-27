import ChatList from '../components/ChatList';

function Home() {
    return (
        <div className='grid w-screen h-screen dark:bg-dark md:flex-center p-4 gap-6 duration-200'>
            <div className='md:max-w-[340px] h-full flex flex-col flex-1'>
                <ChatList />
            </div>
            <div className='hidden md:flex-center dark:text-gray-300 text-xl flex-1 text-center'>
                <h1>Select a conversation and start chatting now!</h1>
            </div>
        </div>
    );
}

export default Home;
