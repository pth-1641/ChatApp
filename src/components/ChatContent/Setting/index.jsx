import { IoCloseOutline } from 'react-icons/io5';
import ModalRole from '../Modal/ModalRole';
import ModalNickname from '../Modal/ModalNickname';
import { useLocation } from 'react-router-dom';
import SettingButtons from './SettingButtons';
import MediaFiles from './MediaFiles';
import ModalMedia from '../Modal/ModalMedia';
import ModalRenameGroupChat from '../Modal/ModalRenameGroupChat';
import ModalLeaveGroup from '../Modal/ModalLeaveGroup';
import { ModalContext } from '../../../App';
import { useContext } from 'react';

function Setting({ setDisplaySetting, roomInfo }) {
    const { displayModal } = useContext(ModalContext);

    const { theme, members, roomName, chatType, emoji } = roomInfo;

    members.sort((a, b) => a.uid.localeCompare(b.uid));

    const location = useLocation();
    const roomId = location.pathname.slice(1);

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
                <SettingButtons
                    roomName={roomName}
                    theme={theme}
                    chatType={chatType}
                    roomId={roomId}
                    emoji={emoji}
                />

                <MediaFiles roomId={roomId} />
            </div>
            {displayModal === 'role' && (
                <ModalRole members={members} roomId={roomId} />
            )}
            {displayModal === 'nickname' && <ModalNickname members={members} />}
            {displayModal === 'rename' && (
                <ModalRenameGroupChat roomId={roomId} roomName={roomName} />
            )}
            {displayModal === 'leave-group' && (
                <ModalLeaveGroup members={members} />
            )}
            {displayModal === 'media' && <ModalMedia roomId={roomId} />}
        </>
    );
}

export default Setting;
