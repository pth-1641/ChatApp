import { MdPlayCircleOutline, MdOutlineCloudDownload } from 'react-icons/md';
import useMedia from '../../../hooks/useMedia';
import { ModalContext } from '../../../App';
import { useContext } from 'react';

function MediaFiles({ roomId }) {
    const images = useMedia(roomId, 'images', 6);
    const videos = useMedia(roomId, 'videos', 6);
    const files = useMedia(roomId, 'files', 6);

    const { setDisplayModal } = useContext(ModalContext);

    return (
        <>
            <div className='mt-3'>
                <div className='flex-between mb-2'>
                    <h3>Shared Photos</h3>
                    <span
                        className='underline text-gray-500 cursor-pointer'
                        onClick={() => setDisplayModal('media')}
                    >
                        See all
                    </span>
                </div>
                <ul className='flex flex-wrap gap-2 texts-sm'>
                    {!images.length ? (
                        <h3 className='font-bold text-gray-500 text-sm w-full text-center'>
                            Empty
                        </h3>
                    ) : (
                        images.map((image) => (
                            <li key={image.chatContent}>
                                <img
                                    src={image.chatContent}
                                    alt=''
                                    className='setting-media'
                                />
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className='mt-6'>
                <div className='flex-between mb-2'>
                    <h3>Shared Videos</h3>
                    <span
                        className='underline text-gray-500 cursor-pointer'
                        onClick={() => setDisplayModal('media')}
                    >
                        See all
                    </span>
                </div>
                <ul className='flex flex-wrap gap-2 text-sm'>
                    {!videos.length ? (
                        <h3 className='font-bold text-gray-500 text-sm w-full text-center'>
                            Empty
                        </h3>
                    ) : (
                        videos.map((video) => (
                            <li key={video.chatContent} className='relative'>
                                <video
                                    src={video.chatContent}
                                    className='setting-media'
                                />
                                <span className='absolute inset-0 bg-[rgba(0,0,0,0.5)] text-white text-5xl flex-center rounded-xl'>
                                    <MdPlayCircleOutline />
                                </span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className='mt-6'>
                <div className='flex-between mb-2'>
                    <h3>Shared Files</h3>
                    <span
                        className='underline text-gray-500 cursor-pointer'
                        onClick={() => setDisplayModal('media')}
                    >
                        See all
                    </span>
                </div>
                <ul className='text-sm'>
                    {!files.length ? (
                        <h3 className='font-bold text-gray-500 text-sm text-center'>
                            Empty
                        </h3>
                    ) : (
                        files.map((file) => (
                            <a
                                key={file.chatContent}
                                className='files'
                                href={file.chatContent}
                                download
                                target='_blank'
                            >
                                <p className='truncate'>{file.fileName}</p>
                                <span className='text-2xl'>
                                    <MdOutlineCloudDownload />
                                </span>
                            </a>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}

export default MediaFiles;
