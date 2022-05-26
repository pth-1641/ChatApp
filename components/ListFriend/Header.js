import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useRouter } from 'next/router';
import {
    IoLogOutOutline,
    MdDarkMode,
    MdLightMode,
    FaUserCircle,
} from 'react-icons/all';
import ModalInfo from './ModalInfo';

function Header() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [displaySetting, setDisplaySetting] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/login');
            }
        });
    }, []);

    const toggleTheme = (e) => {
        e.stopPropagation();
        setDarkMode(!darkMode);
    };

    const handleSignOut = async () => {
        try {
            signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex-between text-white'>
            <span className='text-3xl font-bold'>Chats</span>
            <div
                className='w-10 aspect-square rounded-full border-2 border-white cursor-pointer relative z-10'
                onClick={() => setDisplaySetting(!displaySetting)}
            >
                <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className='rounded-full'
                />
                {displaySetting && (
                    <div className='h-max absolute bg-dark w-48 p-2 rounded-xl right-0 border-gray-600 border mt-3 grid gap-1'>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={() => setDisplayModal(true)}
                        >
                            <span className='text-xl bg-lightDark p-1 rounded-full'>
                                <FaUserCircle />
                            </span>
                            My Infomation
                        </div>
                        <div
                            className='flex items-center gap-2 select-none dark-hover p-2'
                            onClick={toggleTheme}
                        >
                            <span className='text-xl bg-lightDark p-1 rounded-full'>
                                {darkMode ? <MdLightMode /> : <MdDarkMode />}
                            </span>
                            {darkMode ? 'Light' : 'Dark'} Mode
                        </div>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={handleSignOut}
                        >
                            <span className='text-xl bg-lightDark p-1 rounded-full'>
                                <IoLogOutOutline />
                            </span>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
            {displayModal && (
                <ModalInfo user={user} setDisplayModal={setDisplayModal} />
            )}
        </div>
    );
}

export default Header;
