import { useState } from 'react';
import { CgRename } from 'react-icons/cg';
import { FaUserFriends } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { IoImageOutline, IoText } from 'react-icons/io5';
import { MdColorLens } from 'react-icons/md';
import ThemeSetting from './ThemeSetting';
import { Emoji, Picker } from 'emoji-mart';
import {
    updateGroupAvatar,
    updateEmoji,
} from '../../../firebase/functionHandler';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../../firebase/config';
import { useStore } from '../../../store';

function SettingButtons({ theme, chatType, roomId, emoji }) {
    const setModalName = useStore((state) => state.setModalName);

    const [displayTheme, setDisplayTheme] = useState(false);
    const [displayEmoji, setDisplayEmoji] = useState(false);

    const uploadGroupAvatar = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => snapshot,
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    updateGroupAvatar(roomId, url);
                });
            }
        );
    };

    return (
        <div className='flex flex-wrap gap-2 mt-4'>
            <span
                className='setting-btn cursor-pointer'
                onClick={() => {
                    setDisplayEmoji(!displayEmoji);
                    setDisplayTheme(false);
                }}
            >
                <Emoji
                    set='facebook'
                    emoji={emoji.id}
                    size={24}
                    skin={emoji.skin ?? 1}
                />
            </span>
            <button
                type='button'
                className='setting-btn text-white'
                style={{ backgroundColor: theme }}
                onClick={() => {
                    setDisplayTheme(!displayTheme);
                    setDisplayEmoji(false);
                }}
            >
                <MdColorLens />
            </button>
            <button
                type='button'
                className='setting-btn'
                onClick={() => setModalName('nickname')}
            >
                <IoText />
            </button>
            {chatType === 'group' && (
                <>
                    <button
                        type='button'
                        className='setting-btn'
                        onClick={() => setModalName('role')}
                    >
                        <FaUserFriends />
                    </button>
                    <button type='button' className='setting-btn relative'>
                        <input
                            type='file'
                            accept='image/*'
                            className='absolute inset-0 opacity-0'
                            onChange={(e) =>
                                uploadGroupAvatar(e.target.files[0])
                            }
                        />
                        <IoImageOutline />
                    </button>
                    <button
                        type='button'
                        className='setting-btn'
                        onClick={() => setModalName('rename')}
                    >
                        <CgRename />
                    </button>

                    <button
                        type='button'
                        className='setting-btn text-red-500'
                        onClick={() => setModalName('leave-group')}
                    >
                        <TbLogout />
                    </button>
                </>
            )}
            {displayTheme && <ThemeSetting currentTheme={theme} />}
            {displayEmoji && (
                <Picker
                    set='facebook'
                    theme={document.body.classList[0]}
                    showPreview={false}
                    useButton={false}
                    title=''
                    emoji=''
                    sheetSize={32}
                    recent={['']}
                    style={{ border: 'none' }}
                    onClick={(emoji) => updateEmoji(roomId, { ...emoji })}
                />
            )}
        </div>
    );
}

export default SettingButtons;
