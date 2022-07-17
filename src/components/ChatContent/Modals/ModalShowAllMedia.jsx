import ModalTemplate from '../../ModalTemplate';
import { useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { useMedia } from '../../../hooks';
import { useStore } from '../../../store';

function ModalShowAllMedia({ roomId, setLink }) {
    const [mediaType, setMediaType] = useState('images');
    const setModalName = useStore((state) => state.setModalName);

    const images = useMedia(roomId, 'images', 30);
    const videos = useMedia(roomId, 'videos', 30);
    const files = useMedia(roomId, 'files', 30);

    const handleShowFullScreen = (type, link) => {
        setLink({ type, link });
        setModalName('show-full-screen');
    };

    return (
        <ModalTemplate>
            <div className='flex border-b border-b-gray-500'>
                <button
                    type='button'
                    className={`flex-1 py-2 ${
                        mediaType === 'images' && 'bg-lightDark'
                    }`}
                    onClick={() => setMediaType('images')}
                >
                    Images
                </button>
                <button
                    type='button'
                    className={`flex-1 py-2 ${
                        mediaType === 'videos' && 'bg-lightDark'
                    }`}
                    onClick={() => setMediaType('videos')}
                >
                    Videos
                </button>
                <button
                    type='button'
                    className={`flex-1 py-2 ${
                        mediaType === 'files' && 'bg-lightDark'
                    }`}
                    onClick={() => setMediaType('files')}
                >
                    Files
                </button>
            </div>
            <div className='mt-4 h-[320px] overflow-auto'>
                <div className='flex flex-wrap gap-1 items-center'>
                    {mediaType === 'images'
                        ? images.map((image) => (
                              <img
                                  key={image.chatContent}
                                  className='setting-media'
                                  src={image.chatContent}
                                  alt=''
                                  onClick={() =>
                                      handleShowFullScreen(
                                          'image',
                                          image.chatContent
                                      )
                                  }
                              />
                          ))
                        : mediaType === 'videos'
                        ? videos.map((video) => (
                              <video
                                  key={video.chatContent}
                                  src={video.chatContent}
                                  className='setting-media'
                                  onClick={() =>
                                      handleShowFullScreen(
                                          'video',
                                          video.chatContent
                                      )
                                  }
                              />
                          ))
                        : mediaType === 'files'
                        ? files.map((file) => (
                              <a
                                  key={file.chatContent}
                                  href={file.chatContent}
                                  download
                                  target='_blank'
                                  className='files h-max'
                              >
                                  {file.fileName}
                                  <IoMdDownload />
                              </a>
                          ))
                        : ''}
                </div>
            </div>
        </ModalTemplate>
    );
}

export default ModalShowAllMedia;
