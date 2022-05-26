import { useState } from 'react';
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

function ModalInfo({ user, setDisplayModal }) {
    const [copied, setCopied] = useState(false);

    const handleCopyId = () => {
        navigator.clipboard.writeText(user.uid);
        setCopied(true);
    };

    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.75)] z-20 flex-center'>
            <span
                className='bg-[#171616] hover:bg-lightDark absolute top-2 right-2 text-3xl p-2 rounded-full cursor-pointer'
                onClick={() => setDisplayModal(false)}
            >
                <MdClose />
            </span>
            <div className='bg-lightDark p-8 rounded-xl flex-center gap-5'>
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className='rounded-full'
                />
                <div>
                    <p className='text-sm'>
                        <strong className='text-base'>Name: </strong>
                        {user.displayName ?? 'N/A'}
                    </p>
                    <p className='text-sm'>
                        <strong className='text-base'>Email: </strong>
                        {user.email ?? 'N/A'}
                    </p>
                    <p className='text-sm'>
                        <strong className='text-base'>Phone: </strong>
                        {user.phoneNumber ?? 'N/A'}
                    </p>
                    <p className='text-sm flex-center gap-1'>
                        <strong className='text-base'>ID: </strong>
                        {user.uid ?? 'N/A'}
                        <span
                            className={`bg-gray-600 p-2 rounded cursor-pointer border ml-3 ${
                                copied ? 'border-emerald-500' : ''
                            }`}
                            onClick={handleCopyId}
                        >
                            {copied ? <BsClipboardCheck /> : <BsClipboard />}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ModalInfo;
