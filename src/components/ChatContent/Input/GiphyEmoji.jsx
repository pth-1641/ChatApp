import { useState, useRef, useEffect } from 'react';
import { BiFace } from 'react-icons/bi';
import { AiOutlineGif } from 'react-icons/ai';
import useGiphy from '../../../hooks/useGiphy';
import { addMessage } from '../../../firebase/functionHandler';
import moment from 'moment';

function GiphyEmoji({ roomId, uid }) {
    const [displayGifs, setDisplayGifs] = useState(false);
    const [gifsQuery, setGifsQuery] = useState('');
    const [displayStickers, setDisplayStickers] = useState(false);
    const [stickersQuery, setStickersQuery] = useState('');

    const gifInputRef = useRef();
    const stickerInputRef = useRef();

    const gifsData = useGiphy(gifsQuery, 'gifs');
    const stickersData = useGiphy(stickersQuery, 'stickers');

    useEffect(() => {
        stickerInputRef.current?.focus();
        gifInputRef.current?.focus();
    }, [displayStickers, displayGifs]);

    const handleAddGiphy = (url) => {
        addMessage({
            id: new Date().getTime(),
            roomId,
            uid,
            chatContent: url,
            time: moment().toArray(),
            type: 'images',
            fileName: '',
        });
    };

    return (
        <>
            <li
                className='cursor-pointer relative'
                onClick={() => {
                    setDisplayStickers(!displayStickers);
                    setDisplayGifs(false);
                }}
            >
                <BiFace />
                {displayStickers && (
                    <div className='absolute aspect-square h-72 bottom-12 left-0 flex flex-col overflow-auto gap-1 bg-lightDark rounded-md'>
                        <input
                            type='text'
                            value={stickersQuery}
                            ref={stickerInputRef}
                            onChange={(e) => setStickersQuery(e.target.value)}
                            className='input-dark text-white'
                            placeholder='Search'
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className='flex-1 flex-center flex-wrap gap-1 text-2xl text-white'>
                            {Array.isArray(stickersData)
                                ? stickersData.map((sticker, key) => (
                                      <img
                                          key={key}
                                          src={sticker.images.original.url}
                                          className='h-28 flex-1 object-contain'
                                          onClick={() =>
                                              handleAddGiphy(
                                                  sticker.images.original.url
                                              )
                                          }
                                      />
                                  ))
                                : stickersData}
                        </div>
                    </div>
                )}
            </li>
            <li
                className='cursor-pointer relative'
                onClick={() => {
                    setDisplayGifs(!displayGifs);
                    setDisplayStickers(false);
                }}
            >
                <AiOutlineGif />
                {displayGifs && (
                    <div className='absolute aspect-square h-72 bottom-12 left-0 flex flex-col overflow-auto gap-1 bg-lightDark rounded-md'>
                        <input
                            type='text'
                            ref={gifInputRef}
                            value={gifsQuery}
                            onChange={(e) => setGifsQuery(e.target.value)}
                            className='input-dark text-white'
                            placeholder='Search'
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className='flex-1 flex-center flex-wrap gap-1 text-2xl text-white'>
                            {Array.isArray(gifsData)
                                ? gifsData.map((gif, key) => (
                                      <img
                                          key={key}
                                          src={gif.images.original.url}
                                          className='h-28 flex-1 object-cover'
                                          onClick={() =>
                                              handleAddGiphy(
                                                  gif.images.original.url
                                              )
                                          }
                                      />
                                  ))
                                : gifsData}
                        </div>
                    </div>
                )}
            </li>
        </>
    );
}

export default GiphyEmoji;
