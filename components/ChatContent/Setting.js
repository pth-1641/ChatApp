import { IoCloseOutline, IoImageOutline, IoText } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { MdColorLens, MdPlayCircleOutline, MdOutlineCloudDownload } from 'react-icons/md';
import { useState } from 'react';
import ThemeSetting from './ThemeSetting';
import ModalRole from './ModalRole';
import ModalNickname from './Modal/ModalNickname';

function Setting({ setDisplaySetting, detail }) {
    const { theme, members, images, videos, files } = detail;

    const [displayModal, setDisplayModal] = useState('');
    const [showTheme, setShowTheme] = useState(false);

    return (
        <>
            <div className='text-white absolute inset-x-2'>
                <div className='flex-between text-gray-400'>
                    <span>Chat Details</span>
                    <span
                        className='text-2xl cursor-pointer'
                        onClick={() => setDisplaySetting(false)}
                    >
                        <IoCloseOutline />
                    </span>
                </div>
                <div className='flex flex-wrap gap-2 mt-4'>
                    <button
                        type='button'
                        className='setting-btn'
                        onClick={() => setDisplayModal('role')}
                    >
                        <FaUserFriends />
                    </button>
                    <button
                        type='button'
                        className='setting-btn'
                        style={{ backgroundColor: theme }}
                        onClick={() => setShowTheme(!showTheme)}
                    >
                        <MdColorLens />
                    </button>
                    <button type='button' className='setting-btn'>
                        <IoImageOutline />
                    </button>
                    <button
                        type='button'
                        className='setting-btn'
                        onClick={() => setDisplayModal('nickname')}
                    >
                        <IoText />
                    </button>
                    <button type='button' className='setting-btn text-red-500'>
                        <TbLogout />
                    </button>
                </div>
                {showTheme && <ThemeSetting currentTheme={theme} />}
                <div className='mt-6'>
                    <div className='flex-between mb-2'>
                        <h3>Shared Photos</h3>
                        <span className='underline text-gray-500'>See all</span>
                    </div>
                    <ul className='flex flex-wrap gap-2'>
                        {images.map(image => <li key={images}>
                            <img src={image} alt="" className='setting-media'/>
                        </li>)}
                    </ul>
                </div>
                <div className='mt-6'>
                    <div className='flex-between mb-2'>
                        <h3>Shared Videos</h3>
                        <span className='underline text-gray-500'>See all</span>
                    </div>
                    <ul className='flex flex-wrap gap-2'>
                        {videos.map(video => <li key={video} className='relative'><video src={video} className='setting-media'/>
                        <span className='absolute inset-0 bg-[rgba(0,0,0,0.5)] text-white text-5xl flex-center rounded-xl'><MdPlayCircleOutline/></span>
                        </li>)}
                    </ul>
                </div>
                <div className='mt-6'>
                    <div className='flex-between mb-2'>
                        <h3>Shared Files</h3>
                        <span className='underline text-gray-500'>See all</span>
                    </div>
                    <ul className='text-sm'>
                        {files.map(file=> <li key={file.link}>
                            <a href={file.link} download className='underline flex-between hover:bg-lightDark rounded-lg px-4 py-2 duration-200'>{file.fileName}
                            <span className='text-2xl'><MdOutlineCloudDownload/></span>
                            </a>
                            
                        </li>)}
                    </ul>
                </div>
            </div>
            {displayModal === 'role' && (
                <ModalRole
                    setDisplayModal={setDisplayModal}
                    members={members}
                />
            )}
            {displayModal === 'nickname' && (
                <ModalNickname
                    setDisplayModal={setDisplayModal}
                    members={members}
                />
            )}
        </>
    );
}

export default Setting;
