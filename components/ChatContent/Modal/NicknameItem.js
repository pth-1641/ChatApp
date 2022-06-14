import { useState } from 'react';
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { updateNickname } from '../../../firebase/dbInteract';

function NicknameItem({ member, setDisplayModal }) {
    const { displayName, nickname, photoURL } = member;

    const router = useRouter();
    const { roomId } = router.query;

    const [edit, setEdit] = useState(false);
    const [newNickname, setNewNickname] = useState(nickname);

    const handleUpdateNickname = () => {
        if (member.nickname !== newNickname) {
            updateNickname(roomId, member, {
                ...member,
                nickname: newNickname,
            });
        }
        setDisplayModal('');
    };

    return (
        <li className='flex-center gap-2'>
            <img
                src={photoURL}
                alt=''
                className='aspect-square h-10 rounded-full'
            />
            {edit ? (
                <>
                    <input
                        type='text'
                        placeholder={displayName}
                        value={newNickname}
                        className='input-dark flex-1'
                        onChange={(e) => setNewNickname(e.target.value)}
                    />
                    <span
                        className='text-xl cursor-pointer'
                        onClick={handleUpdateNickname}
                    >
                        <AiOutlineCheck />
                    </span>
                </>
            ) : (
                <>
                    <div className='flex flex-col justify-center flex-1'>
                        <p className='text-sm'>
                            {nickname ? nickname : displayName}
                        </p>
                        <span className='text-xs text-gray-400'>
                            {nickname ? displayName : 'Set nickname'}
                        </span>
                    </div>
                    <span
                        className='text-xl cursor-pointer'
                        onClick={() => setEdit(true)}
                    >
                        <AiFillEdit />
                    </span>
                </>
            )}
        </li>
    );
}

export default NicknameItem;
