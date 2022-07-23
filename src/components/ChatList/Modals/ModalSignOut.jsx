import ModalTemplate from '../../ModalTemplate';
import { signOut } from '@firebase/auth';
import { auth } from '../../../firebase/config';
import { useStore } from '../../../store';

function ModalSignOut() {
    const setUser = useStore((state) => state.setUser);
    const setModalName = useStore((state) => state.setModalName);

    const handleSignOut = async () => {
        try {
            setUser({});
            signOut(auth);
        } catch (error) {
            console.log(error);
        }
        setModalName('');
    };

    return (
        <ModalTemplate>
            <h3 className='text-2xl font-semibold text-center'>Log Out?</h3>
            <div className='flex-center gap-3 mt-7'>
                <button
                    className='modal-btn text-black dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800 bg-gray-300 hover:bg-gray-400'
                    onClick={() => setModalName('')}
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
        </ModalTemplate>
    );
}

export default ModalSignOut;
