import { useState } from 'react';
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs';
import Modal from '../../Modal';

function ModalInfo({ user }) {
    const [copied, setCopied] = useState(false);
    const { photoURL, displayName, email, phoneNumber, uid } = user;

    const handleCopyId = () => {
        navigator.clipboard.writeText(uid);
        setCopied(true);
    };

    return (
        <Modal>
            <div className='flex-center gap-5'>
                <img
                    src={photoURL}
                    alt={displayName}
                    className='rounded-full'
                />
                <div>
                    <p className='text-sm'>
                        <strong className='text-base'>Name: </strong>
                        {displayName ?? 'N/A'}
                    </p>
                    <p className='text-sm'>
                        <strong className='text-base'>Email: </strong>
                        {email ?? 'N/A'}
                    </p>
                    <p className='text-sm'>
                        <strong className='text-base'>Phone: </strong>
                        {phoneNumber ?? 'N/A'}
                    </p>
                    <p className='text-sm flex-center gap-x-1'>
                        <strong className='text-base'>ID: </strong>
                        {uid ?? 'N/A'}
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
        </Modal>
    );
}

export default ModalInfo;
