import { FiSearch } from 'react-icons/fi';
import { BsChat } from 'react-icons/bs';
import { useStore } from '../../store';

function SearchInput({ setSearchValue }) {
    const setModalName = useStore((state) => state.setModalName);

    return (
        <>
            <div className='input-dark flex-center gap-2 text-white mt-4'>
                <FiSearch />
                <input
                    type='text'
                    className='bg-lightDark outline-none w-full'
                    placeholder='Search'
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div
                className='text-white text-lg flex mt-3 mb-4 gap-2 cursor-pointer w-max'
                onClick={() => setModalName('create-new-chat')}
            >
                <BsChat />
                <span className='text-sm'>New Conversation</span>
            </div>
        </>
    );
}

export default SearchInput;
