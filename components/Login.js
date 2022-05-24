import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase';
import useStore from '../store';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

function Login() {
    const setUser = useStore((state) => state.setUser);

    const handleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem('userInfo', JSON.stringify(result.user));
            setUser(result.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-pink-600 to-indigo-800 flex flex-col justify-center items-center gap-4'>
            <h1 className='text-white text-6xl font-medium mb-4'>MESSENGER</h1>
            <button
                type='button'
                className='btn bg-white text-black hover:bg-gray-300'
                onClick={() => handleLogin(googleProvider)}
            >
                <FcGoogle /> Log in with Google
            </button>
            <button
                className='btn bg-blue-600 text-white hover:bg-blue-700'
                onClick={() => handleLogin(facebookProvider)}
            >
                <BsFacebook /> Log in with Facebook
            </button>
        </div>
    );
}

export default Login;
