import SeachInput from './SeachInput';

function FriendsList() {
    return (
        <>
            <SeachInput />
            <ul className='grid gap-2 mt-6'>
                <li className='active py-2 px-3 rounded-xl hover:bg-lightDark'>
                    <a className='flex items-center gap-3'>
                        <img
                            src='https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-6/280201421_1120129068546160_1844680744182291277_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RUiXLwF5WnMAX_-MvQY&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT9cvFPQVKCYOAeCNxcKiGKUhjr1zAyKFV6YQhBZQyXZvA&oe=628F05E0'
                            alt=''
                            className='avatar'
                        />
                        <div className='flex-between flex-1'>
                            <div>
                                <h4 className='text-white font-medium'>
                                    Guy Hawkins
                                </h4>
                                <p className='text-gray-400'>
                                    Let's meet today?
                                </p>
                            </div>
                            <div className='text-gray-400'>
                                <time className='text-sm'>11:25</time>
                            </div>
                        </div>
                    </a>
                </li>
                <li className='py-2 px-3 rounded-xl hover:bg-lightDark'>
                    <a className='flex items-center gap-3'>
                        <img
                            src='https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-6/280201421_1120129068546160_1844680744182291277_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RUiXLwF5WnMAX_-MvQY&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT9cvFPQVKCYOAeCNxcKiGKUhjr1zAyKFV6YQhBZQyXZvA&oe=628F05E0'
                            alt=''
                            className='avatar'
                        />
                        <div className='flex-between flex-1'>
                            <div>
                                <h4 className='text-white font-medium'>
                                    Guy Hawkins
                                </h4>
                                <p className='text-gray-400'>
                                    Let's meet today?
                                </p>
                            </div>
                            <div className='text-gray-400'>
                                <time className='text-sm'>11:25</time>
                            </div>
                        </div>
                    </a>
                </li>
                <li className='py-2 px-3 rounded-xl hover:bg-lightDark'>
                    <a className='flex items-center gap-3'>
                        <img
                            src='https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-6/280201421_1120129068546160_1844680744182291277_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RUiXLwF5WnMAX_-MvQY&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT9cvFPQVKCYOAeCNxcKiGKUhjr1zAyKFV6YQhBZQyXZvA&oe=628F05E0'
                            alt=''
                            className='avatar'
                        />
                        <div className='flex-between flex-1'>
                            <div>
                                <h4 className='text-white font-medium'>
                                    Guy Hawkins
                                </h4>
                                <p className='text-gray-400'>
                                    Let's meet today?
                                </p>
                            </div>
                            <div className='text-gray-400'>
                                <time className='text-sm'>11:25</time>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </>
    );
}

export default FriendsList;
