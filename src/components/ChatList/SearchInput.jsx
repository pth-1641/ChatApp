import { FiSearch } from 'react-icons/fi';
import { BsChat } from 'react-icons/bs';
import { useStore } from '../../store';

function SearchInput() {
    const setModalName = useStore((state) => state.setModalName);

    return (
        <>
            <div className='input-dark flex-center gap-2 mt-4'>
                <FiSearch />
                <input
                    type='text'
                    className='dark:bg-lightDark outline-none w-full bg-gray-300'
                    placeholder='Search'
                />
            </div>
            <div
                className='dark:text-white text-lg flex mt-3 mb-4 gap-2 cursor-pointer w-max'
                onClick={() => setModalName('create-new-chat')}
            >
                <BsChat />
                <span className='text-sm'>New Conversation</span>
            </div>
        </>
    );
}

export default SearchInput;
