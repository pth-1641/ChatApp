import ChatList from '../components/ChatList';
import ChatContent from '../components/ChatContent';
import Head from 'next/head';

function Home() {
    return (
        <>
            <Head>
                <title>Messenger</title>
            </Head>
            <div className='w-screen h-screen bg-dark grid grid-cols-12 p-5'>
                <div className='col-span-3'>
                    <ChatList />
                </div>
                <div className='col-span-9'>
                    <ChatContent />
                </div>
            </div>
        </>
    );
}

export default Home;
