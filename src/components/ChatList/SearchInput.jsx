import { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BsChat } from 'react-icons/bs';
import ModalConversation from './Modal/ModalConversation';
import { ModalContext } from '../../App';

function SearchInput() {
    const { displayModal, setDisplayModal } = useContext(ModalContext);

    return (
        <>
            {displayModal === 'new-chat' && <ModalConversation />}
            <div className='input-dark flex-center gap-2 text-white mt-4'>
                <FiSearch />
                <input
                    type='text'
                    className='bg-lightDark outline-none w-full'
                    placeholder='Search'
                />
            </div>
            <div
                className='text-white text-lg flex mt-3 mb-4 gap-2 cursor-pointer w-max'
                onClick={() => setDisplayModal('new-chat')}
            >
                <BsChat />
                <span className='text-sm'>New Conversation</span>
            </div>
        </>
    );
}

export default SearchInput;
