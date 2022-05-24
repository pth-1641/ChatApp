import { useState, useEffect } from 'react';
import Login from './Login';
import ListFriend from './ListFriend';
import ChatContent from './ChatContent';

function ChatApp() {
    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
        setIsLogin(localStorage.userInfo);
    }, []);

    return (
        <>
            {isLogin ? (
                <div className='h-screen bg-dark p-8 grid grid-cols-12 overflow-hidden'>
                    <div className='col-span-3'>
                        <ListFriend />
                    </div>
                    <div className='col-span-9'>
                        <ChatContent />
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </>
    );
}

export default ChatApp;
