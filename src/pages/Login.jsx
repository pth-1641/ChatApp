import { useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged } from '@firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase/config';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { getUser, addNewUser } from '../firebase/functionHandler';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            } else {
                navigate('/login');
            }
        });
    }, []);

    const handleLogin = async (provider) => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            checkUser(user);
        } catch (error) {
            console.log(error);
        }
    };

    const checkUser = async (user) => {
        try {
            const result = await getUser(user.uid);
            if (result.size === 0) {
                addNewUser(user);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-pink-600 to-indigo-800 flex flex-col justify-center items-center gap-4'>
            <h1 className='text-white text-6xl font-medium mb-4'>MESSENGER</h1>
            <button
                type='button'
                className='login-btn bg-white text-black hover:bg-gray-300'
                onClick={() => handleLogin(googleProvider)}
            >
                <FcGoogle /> Log in with Google
            </button>
            <button
                className='login-btn bg-blue-600 text-white hover:bg-blue-700'
                onClick={() => handleLogin(facebookProvider)}
            >
                <BsFacebook /> Log in with Facebook
            </button>
        </div>
    );
}

export default Login;
