import Modal from '../Modal';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

function ModalSignOut({ setDisplayModalSignOut }) {
    const handleSignOut = async () => {
        try {
            signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal setDisplayModalSignOut={setDisplayModalSignOut}>
            <h3 className='text-2xl font-semibold text-center'>Log Out?</h3>
            <div className='flex-center gap-3 mt-7'>
                <button
                    className='modal-btn'
                    onClick={() => setDisplayModalSignOut(false)}
                >
                    No
                </button>
                <button
                    className='modal-btn bg-red-500 hover:bg-red-600'
                    onClick={handleSignOut}
                >
                    Yes
                </button>
            </div>
        </Modal>
    );
}

export default ModalSignOut;
