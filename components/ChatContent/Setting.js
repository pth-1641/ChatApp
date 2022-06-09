import { IoCloseOutline, IoImageOutline } from 'react-icons/io5';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { MdColorLens } from 'react-icons/md';
import { useState } from 'react';
import ThemeSetting from './ThemeSetting';

function Setting({ setDisplaySetting, detail }) {
    const { theme } = detail;

    const [showSetting, setShowSetting] = useState('');

    return (
        <div className='text-white absolute inset-x-2'>
            <div className='flex-between text-gray-400'>
                <span>Chat Details</span>
                <span
                    className='text-2xl cursor-pointer'
                    onClick={() => setDisplaySetting(false)}
                >
                    <IoCloseOutline />
                </span>
            </div>
            <div className='flex flex-wrap gap-2 mt-4'>
                <button type='button' className='setting-btn'>
                    <AiOutlineUserAdd />
                </button>
                <button
                    type='button'
                    className='setting-btn'
                    style={{ backgroundColor: theme }}
                    onClick={() => setShowSetting('theme')}
                >
                    <MdColorLens />
                </button>
                <button type='button' className='setting-btn'>
                    <IoImageOutline />
                </button>

                <button type='button' className='setting-btn text-red-500'>
                    <TbLogout />
                </button>
            </div>
            {showSetting && (
                <ThemeSetting
                    setShowSetting={setDisplaySetting}
                    currentTheme={theme}
                />
            )}
            <div className='mt-6'>
                <div className='flex-between mb-2'>
                    <h3>Shared Photos</h3>
                    <span className='underline text-gray-500'>See all</span>
                </div>
                <ul className='flex flex-wrap justify-center gap-2'>
                    <li>
                        <img
                            src='https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/282759267_436704168282018_7831753338243500396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=o5GpChHRt2kAX-tYoXU&_nc_ht=scontent.fhan2-3.fna&oh=03_AVIu-cFp2a-lBbheVa2bG8MV7x74tHIkw0QVHWQfWSWkrQ&oe=62C830AD'
                            className='setting-media'
                        />
                    </li>
                    <li>
                        <img
                            src='https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/282759267_436704168282018_7831753338243500396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=o5GpChHRt2kAX-tYoXU&_nc_ht=scontent.fhan2-3.fna&oh=03_AVIu-cFp2a-lBbheVa2bG8MV7x74tHIkw0QVHWQfWSWkrQ&oe=62C830AD'
                            className='setting-media'
                        />
                    </li>
                    <li>
                        <img
                            src='https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/282759267_436704168282018_7831753338243500396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=o5GpChHRt2kAX-tYoXU&_nc_ht=scontent.fhan2-3.fna&oh=03_AVIu-cFp2a-lBbheVa2bG8MV7x74tHIkw0QVHWQfWSWkrQ&oe=62C830AD'
                            className='setting-media'
                        />
                    </li>
                    <li>
                        <img
                            src='https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/282759267_436704168282018_7831753338243500396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=o5GpChHRt2kAX-tYoXU&_nc_ht=scontent.fhan2-3.fna&oh=03_AVIu-cFp2a-lBbheVa2bG8MV7x74tHIkw0QVHWQfWSWkrQ&oe=62C830AD'
                            className='setting-media'
                        />
                    </li>
                    <li>
                        <img
                            src='https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/282759267_436704168282018_7831753338243500396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=o5GpChHRt2kAX-tYoXU&_nc_ht=scontent.fhan2-3.fna&oh=03_AVIu-cFp2a-lBbheVa2bG8MV7x74tHIkw0QVHWQfWSWkrQ&oe=62C830AD'
                            className='setting-media'
                        />
                    </li>
                    <li>
                        <img
                            src='https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/282759267_436704168282018_7831753338243500396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=o5GpChHRt2kAX-tYoXU&_nc_ht=scontent.fhan2-3.fna&oh=03_AVIu-cFp2a-lBbheVa2bG8MV7x74tHIkw0QVHWQfWSWkrQ&oe=62C830AD'
                            className='setting-media'
                        />
                    </li>
                </ul>
            </div>
            <div className='mt-6'>
                <div className='flex-between mb-2'>
                    <h3>Shared Videos</h3>
                    <span className='underline text-gray-500'>See all</span>
                </div>
                <ul className='flex flex-wrap justify-center gap-2'>
                    <li className='h-20 aspect-video relative rounded-xl overflow-hidden'>
                        <iframe
                            src='https://streamable.com/e/0u87hx?loop=0&nocontrols=1'
                            frameBorder='0'
                            allowFullScreen
                            className='w-full h-full absolute inset-0'
                        />
                        <div className='absolute inset-0 cursor-pointer'></div>
                    </li>
                    <li className='h-20 aspect-video relative rounded-xl overflow-hidden'>
                        <iframe
                            src='https://streamable.com/e/0u87hx?loop=0&nocontrols=1'
                            frameBorder='0'
                            allowFullScreen
                            className='w-full h-full absolute inset-0'
                        />
                        <div className='absolute inset-0 cursor-pointer'></div>
                    </li>
                    <li className='h-20 aspect-video relative rounded-xl overflow-hidden'>
                        <iframe
                            src='https://streamable.com/e/0u87hx?loop=0&nocontrols=1'
                            frameBorder='0'
                            allowFullScreen
                            className='w-full h-full absolute inset-0'
                        />
                        <div className='absolute inset-0 cursor-pointer'></div>
                    </li>
                    <li className='h-20 aspect-video relative rounded-xl overflow-hidden'>
                        <iframe
                            src='https://streamable.com/e/0u87hx?loop=0&nocontrols=1'
                            frameBorder='0'
                            allowFullScreen
                            className='w-full h-full absolute inset-0'
                        />
                        <div className='absolute inset-0 cursor-pointer'></div>
                    </li>
                </ul>
            </div>
            <div className='mt-6'>
                <div className='flex-between mb-2'>
                    <h3>Shared Links</h3>
                    <span className='underline text-gray-500'>See all</span>
                </div>
                <ul>
                    <li className='text-blue-500 underline'>
                        <a href='https://google.com' target='_blank'>
                            https://google.com
                        </a>
                    </li>
                    <li className='text-blue-500 underline'>
                        <a href='https://google.com' target='_blank'>
                            https://google.com
                        </a>
                    </li>
                    <li className='text-blue-500 underline'>
                        <a href='https://google.com' target='_blank'>
                            https://google.com
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Setting;
