import ChatList from '../components/ChatList';
import ChatContent from '../components/ChatContent';
import Head from 'next/head';

function Home() {
    return (
        <>
            <Head>
                <title>Messenger</title>
            </Head>
            <div className='w-screen h-screen bg-dark flex-center p-4 gap-6'>
                <div className='max-w-[340px] h-full flex flex-col flex-1'>
                    <ChatList />
                </div>
                <div className='flex-center text-gray-300 text-xl flex-1'>
                    <h1>Select a conversation and start chatting now!</h1>
                </div>
            </div>
        </>
    );
}

export default Home;
