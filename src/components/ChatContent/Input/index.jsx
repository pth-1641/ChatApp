import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { MdEmojiEmotions } from 'react-icons/md';
import { useStore } from '../../../store';
import { addMessage } from '../../../firebase/functionHandler';
import moment from 'moment';
import { Picker, Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import FileMedia from './FileMedia';

function Input({ roomId, theme, emoji, reply, setDisplayReply, setReply }) {
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const [chatContent, setChatContent] = useState('');

    const { uid } = useStore((state) => state.user) ?? '';

    const handleSendMessage = (e, chatContent) => {
        e.preventDefault();
        if (chatContent) {
            addMessage({
                roomId,
                uid,
                chatContent: chatContent.trim(),
                time: moment().toArray(),
                type: 'message',
                fileName: '',
                replyId: reply.id || null,
            });
            setChatContent('');
            setDisplayReply(false);
            setReply({});
        }
    };

    return (
        <form
            className='w-full flex-center gap-3'
            onSubmit={(e) => handleSendMessage(e, chatContent)}
        >
            <div className='flex-center input-dark py-0'>
                {!chatContent && (
                    <FileMedia theme={theme} roomId={roomId} uid={uid} />
                )}
                <input
                    type='text'
                    className='input-dark pl-0'
                    placeholder='Message'
                    value={chatContent}
                    onChange={(e) => setChatContent(e.target.value)}
                />
                <span
                    className='text-xl cursor-pointer relative'
                    style={{ color: theme }}
                    onClick={() => setDisplayEmoji(!displayEmoji)}
                >
                    <MdEmojiEmotions />
                    {displayEmoji && (
                        <span
                            className='absolute right-0 bottom-12'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Picker
                                set='facebook'
                                theme={document.body.classList[0]}
                                showPreview={false}
                                useButton={false}
                                title='pth-1641'
                                emoji='heart'
                                sheetSize={32}
                                emojiTooltip={true}
                                onClick={(emoji) =>
                                    setChatContent(chatContent + emoji.native)
                                }
                            />
                        </span>
                    )}
                </span>
            </div>
            <div type='button' className='text-2xl' style={{ color: theme }}>
                {chatContent ? (
                    <button type='submit' className='flex-center'>
                        <IoSend />
                    </button>
                ) : (
                    <span className='cursor-pointer'>
                        <Emoji
                            set='facebook'
                            size={26}
                            emoji={emoji?.id ?? '+1'}
                            skin={emoji?.skin ?? 1}
                            onClick={(emoji, event) =>
                                handleSendMessage(event, emoji.native)
                            }
                        />
                    </span>
                )}
            </div>
        </form>
    );
}

export default Input;
