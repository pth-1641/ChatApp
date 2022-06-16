import { MdClose } from 'react-icons/md';
import { getRoom } from '../../../firebase/functionHandler';
import { useEffect, useState } from 'react';

function ModalShowImage({ link, setShowImage, roomId }) {
    const [listImage, setListImage] = useState([]);
    const [imageLink, setImageLink] = useState(link);

    useEffect(() => {
        async function fetchImages() {
            const res = await getRoom(roomId);
            res.forEach((doc) => setListImage(doc.data().images));
        }
        fetchImages();
    }, [roomId]);

    return (
        <div className='fixed inset-0 z-20 text-white backdrop-blur-lg px-10 flex flex-col gap-2'>
            <span
                className='absolute top-2 right-2 text-3xl rounded-full bg-[rgba(0,0,0,0.75)] p-1 cursor-pointer duration-200 hover:bg-gray-700'
                onClick={() => setShowImage(false)}
            >
                <MdClose />
            </span>
            <img
                src={imageLink}
                alt=''
                className='flex-1 h-1/2 w-fit mx-auto rounded-lg'
            />
            <ul className='h-12 flex items-center gap-2 max-w-5xl mx-auto'>
                {listImage.map((image) => (
                    <li
                        className='h-full cursor-pointer'
                        onClick={() => setImageLink(image)}
                    >
                        <img
                            src={image}
                            alt=''
                            className='h-full setting-media'
                            style={{ opacity: image === imageLink ? 1 : 0.5 }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ModalShowImage;
