import Modal from '../../Modal';
import { useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import useMedia from '../../../hooks/useMedia';
function ModalMedia({ roomId }) {
    const [mediaType, setMediaType] = useState('images');

    const images = useMedia(roomId, 'images', 30);
    const videos = useMedia(roomId, 'videos', 30);
    const files = useMedia(roomId, 'files', 30);

    return (
        <Modal>
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
                <div className='flex flex-wrap gap-1 justify-center'>
                    {mediaType === 'images'
                        ? images.map((image) => (
                              <img
                                  className='setting-media'
                                  src={image.chatContent}
                                  alt=''
                              />
                          ))
                        : mediaType === 'videos'
                        ? videos.map((video) => (
                              <video src={video.chatContent} />
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
        </Modal>
    );
}

export default ModalMedia;
