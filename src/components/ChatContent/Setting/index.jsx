import { IoCloseOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import SettingButtons from './SettingButtons';
import MediaFiles from './MediaFiles';

function Setting({ setDisplaySetting, roomInfo, setLink }) {
    const { theme, members, roomName, chatType, emoji } = roomInfo;

    members.sort((a, b) => a.uid.localeCompare(b.uid));

    const location = useLocation();
    const roomId = location.pathname.slice(1);

    return (
        <>
            <div className='dark:text-white absolute inset-x-2'>
                <div className='flex-between dark:text-gray-400 text-gray-600'>
                    <span>Chat Details</span>
                    <span
                        className='text-2xl cursor-pointer'
                        onClick={() => setDisplaySetting(false)}
                    >
                        <IoCloseOutline />
                    </span>
                </div>
                <SettingButtons
                    roomName={roomName}
                    theme={theme}
                    chatType={chatType}
                    roomId={roomId}
                    emoji={emoji}
                />

                <MediaFiles roomId={roomId} setLink={setLink} />
            </div>
        </>
    );
}

export default Setting;
