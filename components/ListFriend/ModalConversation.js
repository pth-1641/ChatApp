import Modal from '../Modal';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { getUser } from '../../firebase/dbInteract';

function ModalConversation({ setDisplayNewConversation }) {
    const [roomName, setRoomName] = useState('');
    const [friendID, setFriendID] = useState('');
    const [members, setMembers] = useState([]);

    const handleCreate = (e) => {
        e.preventDefault();
        setDisplayNewConversation(false);
    };

    const handleAddMember = async () => {
        const member = await getUser(friendID);
        if (member.size) {
            member.forEach((doc) =>
                setMembers([
                    ...members,
                    {
                        displayName: doc.data().displayName,
                        photoURL: doc.data().photoURL,
                        uid: doc.data().uid,
                    },
                ])
            );
            setFriendID('');
        }
    };

    const handleDeleteMember = (uid) => {
        const index = members.findIndex((member) => member.uid === uid);
        members.splice(index, 1);
        setMembers(members);
    };

    return (
        <Modal setDisplayNewConversation={setDisplayNewConversation}>
            <form onSubmit={handleCreate}>
                <label>Name</label>
                <input
                    type='text'
                    className='input-dark mt-1 mb-3'
                    required
                    placeholder='Room Name'
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <label>Members</label>
                <div className='flex-center gap-2 mt-1 mb-3'>
                    <input
                        type='text'
                        placeholder="Friend's ID"
                        className='input-dark'
                        value={friendID}
                        onChange={(e) => setFriendID(e.target.value)}
                    />
                    <button
                        type='button'
                        className='modal-btn bg-emerald-500 hover:bg-emerald-600'
                        onClick={handleAddMember}
                    >
                        Add
                    </button>
                </div>
                <ul className='flex items-center flex-wrap gap-2'>
                    <img
                        src='https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/282206190_1130470397512027_1785203650365955963_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dfmEKP7N0YwAX_VuB9z&_nc_oc=AQnCVKrsVK92MJsnnag4cjgj5ja0ceQdKnc0SrKVaUa-UbLP8woRMy-ZArW-7R6gooQem3vK7xAjK9Q4frLaJUbZ&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_sC-vH65LIYRslbyspNuRHe9VCAiJHm4cOvTIcYCExeQ&oe=62950428'
                        alt=''
                        className='w-12 aspect-square rounded-full'
                    />
                    {members.map((member) => (
                        <div
                            className='w-12 aspect-square relative'
                            key={member.uid}
                        >
                            <img
                                src={member.photoURL}
                                className='rounded-full'
                            />
                            <span
                                className='absolute -top-1 -right-1 p-0.5 bg-gray-500 text-sm rounded-full cursor-pointer'
                                onClick={() => handleDeleteMember(member.uid)}
                            >
                                <IoClose />
                            </span>
                        </div>
                    ))}
                </ul>
                <div className='flex-center justify-end gap-3 mt-6'>
                    <button
                        className='modal-btn bg-red-500 hover:bg-red-600'
                        type='button'
                        onClick={() => setDisplayNewConversation(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className='modal-btn bg-blue-500 hover:bg-blue-600'
                        type='submit'
                    >
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalConversation;
