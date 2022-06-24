import Modal from '../../Modal';
import { signOut } from '@firebase/auth';
import { auth } from '../../../firebase/config';
import { useStore } from '../../../store';
import { ModalContext } from '../../../App';
import { useContext } from 'react';

function ModalSignOut() {
    const setUser = useStore((state) => state.setUser);
    const { setDisplayModal } = useContext(ModalContext);

    const handleSignOut = async () => {
        try {
            setUser({});
            signOut(auth);
        } catch (error) {
            console.log(error);
        }
        setDisplayModal('');
    };

    return (
        <Modal>
            <h3 className='text-2xl font-semibold text-center'>Log Out?</h3>
            <div className='flex-center gap-3 mt-7'>
                <button
                    className='modal-btn'
                    onClick={() => setDisplayModal('')}
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
