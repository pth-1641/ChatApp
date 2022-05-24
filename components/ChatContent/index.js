import Input from './Input';

function ChatContent() {
    return (
        <div className='h-full ml-10 relative'>
            <header className='w-full flex items-center gap-3 pb-2 absolute top-0'>
                <img
                    src='https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-6/280201421_1120129068546160_1844680744182291277_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RUiXLwF5WnMAX_-MvQY&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT9cvFPQVKCYOAeCNxcKiGKUhjr1zAyKFV6YQhBZQyXZvA&oe=628F05E0'
                    alt=''
                    className='avatar h-14 w-14'
                />
                <h4 className='text-white font-medium'>Guy Hawkins</h4>
            </header>
            <div className='w-full pr-2 absolute top-16 bottom-16 overflow-y-scroll'>
                <div className='flex gap-3 mt-5'>
                    <img
                        src='https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/277518378_706398723732358_4112998954889509594_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GPpY5EEAZNoAX-4-5Xz&tn=lpKKFeJSkaNdnkT5&_nc_ht=scontent.fhan5-11.fna&oh=00_AT-4ppJ6nb1XlGA93C-r5_bEF0_BMi4BOTsZqSIhHNKxwg&oe=628F63B2'
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
