import { ImAttachment } from 'react-icons/im';
import { MdSlowMotionVideo } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../../firebase/config';
import { addMessage } from '../../../firebase/functionHandler';
import moment from 'moment';

function FileMedia({ theme, roomId, uid }) {
    const uploadFile = (file, type) => {
        if (!file) return;
        const storageRef = ref(storage, `/${type}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => snapshot,
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addMessage({
                        id: new Date().getTime(),
                        roomId,
                        uid,
                        chatContent: url,
                        time: moment().toArray(),
                        type,
                        fileName: file.name,
                    });
                });
            }
        );
    };

    return (
        <>
            <li className='flex-center relative'>
                <ImAttachment />
                <input
                    type='file'
                    className='absolute inset-0 opacity-0'
                    accept='.pdf, text/plain, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    onChange={(e) => uploadFile(e.target.files[0], 'files')}
                />
            </li>
            <li className='flex-center relative'>
                <MdSlowMotionVideo />
                <input
                    type='file'
                    className='absolute inset-0 opacity-0'
                    accept='video/*'
                    onChange={(e) => uploadFile(e.target.files[0], 'videos')}
                />
            </li>
            <li className='flex-center relative'>
                <BsImages />
                <input
                    type='file'
                    className='absolute inset-0 opacity-0'
                    accept='image/*'
                    onChange={(e) => uploadFile(e.target.files[0], 'images')}
                />
            </li>
        </>
    );
}

export default FileMedia;
