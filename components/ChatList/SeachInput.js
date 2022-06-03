import { useState, memo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BsChat } from 'react-icons/bs';
import ModalConversation from './ModalConversation';

function SearchInput() {
    const [displayNewConversation, setDisplayNewConversation] = useState(false);
    const handleAddNewChat = () => {
        setDisplayNewConversation(true);
    };

    return (
        <>
            {displayNewConversation && (
                <ModalConversation
                    setDisplayNewConversation={setDisplayNewConversation}
                />
            )}

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
                onClick={handleAddNewChat}
            >
                <BsChat />
                <span className='text-sm'>New Conversation</span>
            </div>
        </>
    );
}

export default memo(SearchInput);
