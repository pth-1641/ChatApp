import { storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useState } from 'react';

function upload() {
    const [progress, setProgress] = useState(0);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        uploadFile(file);
    };

    const uploadFile = (file) => {
        if (!file) return;
        console.log(file.name);
        // const storageRef = ref(storage, `/images/${file.name}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);

        // uploadTask.on(
        //     'state_changed',
        //     (snapshot) => snapshot,
        //     (err) => console.log(err),
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((url) =>
        //             console.log(url)
        //         );
        //     }
        // );
    };

    return (
        <>
            <form
                onChange={handleUploadImage}
                onSubmit={(e) => e.preventDefault()}
            >
                <input type='file' />
                <button className='modal-btn text-white'>Submit</button>
            </form>
            <h3>Upload {progress}%</h3>
        </>
    );
}

export default upload;
