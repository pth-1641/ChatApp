import Input from './Input';

function ChatContent() {
    return (
        <div className='h-full ml-10 relative'>
            <header className='w-full flex items-center gap-3 pb-2 absolute top-0'>
                <img
                    src='https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/282206190_1130470397512027_1785203650365955963_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dfmEKP7N0YwAX_VuB9z&_nc_oc=AQnCVKrsVK92MJsnnag4cjgj5ja0ceQdKnc0SrKVaUa-UbLP8woRMy-ZArW-7R6gooQem3vK7xAjK9Q4frLaJUbZ&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_sC-vH65LIYRslbyspNuRHe9VCAiJHm4cOvTIcYCExeQ&oe=62950428'
                    alt=''
                    className='avatar h-14 w-14'
                />
                <h4 className='text-white font-medium'>Guy Hawkins</h4>
            </header>
            <div className='w-full pr-2 absolute top-16 bottom-16 overflow-y-scroll'>
                <div className='flex gap-3 mt-5'>
                    <img
                        src='https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/282206190_1130470397512027_1785203650365955963_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dfmEKP7N0YwAX_VuB9z&_nc_oc=AQnCVKrsVK92MJsnnag4cjgj5ja0ceQdKnc0SrKVaUa-UbLP8woRMy-ZArW-7R6gooQem3vK7xAjK9Q4frLaJUbZ&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_sC-vH65LIYRslbyspNuRHe9VCAiJHm4cOvTIcYCExeQ&oe=62950428'
                        alt=''
                        className='avatar h-7 w-7'
                    />
                    <ul className='grid gap-1'>
                        <li className='friend-message'>
                            It was a great vacation. I was in Paris
                        </li>
                        <li className='friend-message'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Amet corporis eius excepturi illo expedita
                            earum perspiciatis consequuntur cumque accusamus in
                            nam eaque molestias ab consequatur assumenda quis,
                            iure, adipisci placeat.
                        </li>
                        <li className='friend-message'>
                            It was a great vacation. I was in Paris
                        </li>
                    </ul>
                </div>
                <div className='flex justify-end gap-3 mt-5'>
                    <ul className='flex flex-col items-end gap-1'>
                        <li className='my-message'>
                            It was a great vacation. I was in Paris
                        </li>
                        <li className='my-message'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Amet corporis eius excepturi illo expedita
                            earum perspiciatis consequuntur cumque accusamus in
                            nam eaque molestias ab consequatur assumenda quis,
                            iure, adipisci placeat.
                        </li>
                        <li className='my-message p-0'>
                            <img
                                src='https://cdn.dribbble.com/userupload/2764151/file/original-06e67f20bfda63f5dff851fcd8232ee5.png?compress=1&resize=320x240&vertical=top'
                                alt=''
                                className='image'
                            />
                        </li>
                        <li className='my-message p-0'>
                            <img
                                src='https://cdn.dribbble.com/userupload/2764151/file/original-06e67f20bfda63f5dff851fcd8232ee5.png?compress=1&resize=320x240&vertical=top'
                                alt=''
                                className='image'
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <Input />
        </div>
    );
}

export default ChatContent;
