import SeachInput from './SeachInput';
import Header from './Header';

function FriendsList() {
    return (
        <>
            <Header />
            <SeachInput />
            <ul className='grid gap-1'>
                <li className='active py-2 px-3 rounded-xl hover:bg-lightDark'>
                    <a className='flex items-center gap-3'>
                        <img
                            src='https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/282206190_1130470397512027_1785203650365955963_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dfmEKP7N0YwAX_VuB9z&_nc_oc=AQnCVKrsVK92MJsnnag4cjgj5ja0ceQdKnc0SrKVaUa-UbLP8woRMy-ZArW-7R6gooQem3vK7xAjK9Q4frLaJUbZ&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_sC-vH65LIYRslbyspNuRHe9VCAiJHm4cOvTIcYCExeQ&oe=62950428'
                            alt=''
                            className='avatar'
                        />
                        <div className='flex-between flex-1'>
                            <div>
                                <h4 className='text-white font-medium'>
                                    Guy Hawkins
                                </h4>
                                <p className='text-gray-400'>
                                    Let{"'"}s meet today?
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
                            src='https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/282206190_1130470397512027_1785203650365955963_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dfmEKP7N0YwAX_VuB9z&_nc_oc=AQnCVKrsVK92MJsnnag4cjgj5ja0ceQdKnc0SrKVaUa-UbLP8woRMy-ZArW-7R6gooQem3vK7xAjK9Q4frLaJUbZ&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_sC-vH65LIYRslbyspNuRHe9VCAiJHm4cOvTIcYCExeQ&oe=62950428'
                            alt=''
                            className='avatar'
                        />
                        <div className='flex-between flex-1'>
                            <div>
                                <h4 className='text-white font-medium'>
                                    Guy Hawkins
                                </h4>
                                <p className='text-gray-400'>
                                    Let{"'"}s meet today?
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
                            src='https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/282206190_1130470397512027_1785203650365955963_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dfmEKP7N0YwAX_VuB9z&_nc_oc=AQnCVKrsVK92MJsnnag4cjgj5ja0ceQdKnc0SrKVaUa-UbLP8woRMy-ZArW-7R6gooQem3vK7xAjK9Q4frLaJUbZ&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_sC-vH65LIYRslbyspNuRHe9VCAiJHm4cOvTIcYCExeQ&oe=62950428'
                            alt=''
                            className='avatar'
                        />
                        <div className='flex-between flex-1'>
                            <div>
                                <h4 className='text-white font-medium'>
                                    Guy Hawkins
                                </h4>
                                <p className='text-gray-400'>
                                    Let{"'"}s meet today?
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
