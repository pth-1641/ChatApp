import { useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useStore } from '../../store';
import { useDarkMode } from '../../hooks';

function Header({ user }) {
    const setModalName = useStore((state) => state.setModalName);

    const [setTheme, colorTheme] = useDarkMode();
    const [darkMode, setDarkMode] = useState(true);
    const [displaySetting, setDisplaySetting] = useState(false);

    const toggleTheme = (e) => {
        e.stopPropagation();
        setDarkMode(!darkMode);
        setTheme(colorTheme);
    };

    return (
        <div className='flex-between dark:text-white'>
            <span className='text-3xl font-bold'>Chats</span>
            <div
                className='w-10 aspect-square rounded-full border-2 border-gray-400 dark:border-white cursor-pointer relative z-10'
                onClick={() => setDisplaySetting(!displaySetting)}
            >
                <img src={user?.photoURL} alt='' className='rounded-full' />
                {displaySetting && (
                    <div className='h-max absolute bg-white dark:bg-dark w-48 p-2 rounded-xl right-0 border-gray-600 border mt-3 grid gap-1 select-none'>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={() => setModalName('user-info')}
                        >
                            <span className='text-xl dark:bg-lightDark bg-gray-300 p-1 rounded-full'>
                                <FaUserCircle />
                            </span>
                            My Infomation
                        </div>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={toggleTheme}
                        >
                            <span className='text-xl dark:bg-lightDark p-1 bg-gray-300 rounded-full'>
                                {darkMode ? <MdLightMode /> : <MdDarkMode />}
                            </span>
                            {darkMode ? 'Light' : 'Dark'} Mode
                        </div>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={() => setModalName('log-out')}
                        >
                            <span className='text-xl dark:bg-lightDark p-1 bg-gray-300 rounded-full'>
                                <IoLogOutOutline />
                            </span>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
