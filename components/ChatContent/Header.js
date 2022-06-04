function Header({ detail }) {
    const { roomName, chatAvatar, avatarBgColor } = detail;

    return (
        <header className='w-full flex items-center gap-3 pb-2 absolute top-0'>
            <div
                className={`rounded-full w-12 aspect-square overflow-hidden flex-center ${avatarBgColor}`}
            >
                {chatAvatar ? (
                    <img src={chatAvatar} alt='' />
                ) : (
                    <span className='text-white text-3xl select-none'>
                        {roomName ? roomName[0] : ''}
                    </span>
                )}
            </div>
            <h4 className='text-white font-medium'>{roomName}</h4>
        </header>
    );
}

export default Header;
