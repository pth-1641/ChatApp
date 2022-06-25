import { useState, useContext } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import ModalInfo from './Modal/ModalInfo';
import ModalSignOut from './Modal/ModalSignOut';
import { ModalContext } from '../../App';

function Header({ user }) {
    const { displayModal, setDisplayModal } = useContext(ModalContext);

    const [displaySetting, setDisplaySetting] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = (e) => {
        e.stopPropagation();
        setDarkMode(!darkMode);
    };

    return (
        <div className='flex-between text-white'>
            <span className='text-3xl font-bold'>Chats</span>
            <div
                className='w-10 aspect-square rounded-full border-2 border-white cursor-pointer relative z-10'
                onClick={() => setDisplaySetting(!displaySetting)}
            >
                <img src={user?.photoURL} alt='' className='rounded-full' />
                {displaySetting && (
                    <div className='h-max absolute bg-dark w-48 p-2 rounded-xl right-0 border-gray-600 border mt-3 grid gap-1 select-none'>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={() => setDisplayModal('info')}
                        >
                            <span className='text-xl bg-lightDark p-1 rounded-full'>
                                <FaUserCircle />
                            </span>
                            My Infomation
                        </div>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={toggleTheme}
                        >
                            <span className='text-xl bg-lightDark p-1 rounded-full'>
                                {darkMode ? <MdLightMode /> : <MdDarkMode />}
                            </span>
                            {darkMode ? 'Light' : 'Dark'} Mode
                        </div>
                        <div
                            className='flex items-center gap-2 dark-hover p-2'
                            onClick={() => setDisplayModal('log-out')}
                        >
                            <span className='text-xl bg-lightDark p-1 rounded-full'>
                                <IoLogOutOutline />
                            </span>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
            {displayModal === 'info' && <ModalInfo user={user} />}
            {displayModal === 'log-out' && <ModalSignOut />}
        </div>
    );
}

export default Header;
