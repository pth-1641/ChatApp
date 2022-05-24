import { FiSearch } from 'react-icons/fi';

function Seach() {
    return (
        <div className='input-dark flex-center gap-2 text-white'>
            <FiSearch />
            <input
                type='text'
                className='bg-lightDark outline-none w-full'
                placeholder='Search'
            />
        </div>
    );
}

export default Seach;
