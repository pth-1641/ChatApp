import Modal from '../../Modal';
import { useState, useEffect } from 'react';
import {
    getUser,
    updateMembers,
    updateAdmin,
} from '../../../firebase/functionHandler';
import { BsThreeDots } from 'react-icons/bs';
import { useStore } from '../../../store';

function ModalNickname({ members, roomId }) {
    const [role, setRole] = useState('All');
    const [membersRole, setMembersRole] = useState([]);
    const [newMemberId, setNewMemberId] = useState('');
    const [message, setMessage] = useState('');
    const [displayOption, setDisplayOption] = useState('');

    const user = useStore((state) => state.user);
    const currentMem = members.find((mem) => mem.uid === user.uid);

    useEffect(() => {
        if (role === 'Admins') {
            setMembersRole(members.filter((member) => member.isAdmin));
        } else if (role === 'Members') {
            setMembersRole(members.filter((member) => !member.isAdmin));
        } else {
            setMembersRole(members);
        }
    }, [role, members]);

    const handleAddNewMember = async () => {
        const isAdded = members.some((mem) => mem.uid === newMemberId);
        if (isAdded) {
            setMessage('This member has been added!');
        } else {
            const resUser = await getUser(newMemberId);
            if (!resUser.size && newMemberId) {
                setMessage('This ID does not exist!');
            } else {
                resUser.forEach((doc) =>
                    updateMembers(roomId, doc.data(), 'add')
                );
                setNewMemberId('');
                setMessage('');
            }
        }
    };

    return (
        <Modal>
            <div className='flex-center justify-around border-b border-gray-500 mb-3'>
                <button
                    type='button'
                    className={`w-full px-8 py-2 ${
                        role === 'All' && 'bg-lightDark'
                    }`}
                    onClick={(e) => setRole(e.target.innerText)}
                >
                    All
                </button>
                <button
                    type='button'
                    className={`w-full px-8 py-2 ${
                        role === 'Admins' && 'bg-lightDark'
                    }`}
                    onClick={(e) => setRole(e.target.innerText)}
                >
                    Admins
                </button>
                <button
                    type='button'
                    className={`w-full px-8 py-2 ${
                        role === 'Members' && 'bg-lightDark'
                    }`}
                    onClick={(e) => setRole(e.target.innerText)}
                >
                    Members
                </button>
            </div>
            <div className='flex-center mb-2 gap-1'>
                <input
                    type='text'
                    className='input-dark'
                    placeholder="New member's ID"
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.target.value)}
                />
                <button
                    className='modal-btn bg-violet-500 hover:bg-violet-600'
                    onClick={handleAddNewMember}
                >
                    Add
                </button>
            </div>
            <p className='text-red-500 text-sm mb-1'>{message}</p>
            <ul className='flex flex-col gap-2 overflow-y-scroll h-[360px]'>
                {membersRole.map((mem) => (
                    <li key={mem.uid} className='flex items-center gap-3'>
                        <img
                            src={mem.photoURL}
                            alt=''
                            className='rounded-full aspect-square h-10'
                        />
                        <div className='flex flex-col justify-center flex-1'>
                            <p className='text-sm'>{mem.displayName}</p>
                            <span className='text-xs text-gray-400'>
                                {mem.isAdmin ? 'Admin' : 'Member'}
                            </span>
                        </div>
                        {user.uid !== mem.uid && currentMem.isAdmin && (
                            <span
                                className='cursor-pointer relative text-sm'
                                onClick={() =>
                                    setDisplayOption(
                                        displayOption === '' ? mem.uid : ''
                                    )
                                }
                            >
                                <BsThreeDots />
                                {displayOption === mem.uid && (
                                    <ul className='z-10 absolute w-max rounded-md bg-lightDark right-0 py-1 px-2 select-none'>
                                        <li
                                            className='duration-150 rounded p-1 px-2 hover:bg-gray-600'
                                            onClick={() =>
                                                updateMembers(
                                                    roomId,
                                                    mem,
                                                    'remove'
                                                )
                                            }
                                        >
                                            Remove
                                        </li>
                                        {!mem.isAdmin && (
                                            <li
                                                className='duration-150 rounded p-1 px-2 hover:bg-gray-600'
                                                onClick={() =>
                                                    updateAdmin(roomId, mem)
                                                }
                                            >
                                                Add as Admin
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </Modal>
    );
}

export default ModalNickname;
