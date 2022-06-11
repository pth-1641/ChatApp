import Modal from '../Modal';
import { useState, useEffect } from 'react';

function ModalNickname({ setDisplayModal, members }) {
    const [role, setRole] = useState('All');
    const [membersRole, setMembersRole] = useState([]);

    useEffect(() => {
        if (role === 'Admins') {
            setMembersRole(members.filter((member) => member.isAdmin));
        } else if (role === 'Members') {
            setMembersRole(members.filter((member) => !member.isAdmin));
        } else {
            setMembersRole(members);
        }
    }, [role]);

    return (
        <Modal setDisplayModal={setDisplayModal}>
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
            <ul className='flex flex-col gap-2 overflow-y-scroll h-[360px]'>
                {membersRole.map((mem) => (
                    <li key={mem.uid} className='flex items-center gap-3'>
                        <img
                            src={mem.photoURL}
                            alt=''
                            className='rounded-full aspect-square h-10'
                        />
                        <div className='flex flex-col justify-center'>
                            <p className='text-sm'>{mem.displayName}</p>
                            <span className='text-xs text-gray-400'>
                                {mem.isAdmin ? 'Admin' : 'Member'}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </Modal>
    );
}

export default ModalNickname;
