import { useNavigate } from 'react-router-dom';
import NotFoundImage from '/404.jpg';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            className='bg-dark h-screen flex-center flex-col bg-cover bg-top'
            style={{ backgroundImage: `url(${NotFoundImage})` }}
        >
            <button
                className='modal-btn text-white bg-transparent border-2 border-blue-500 hover:bg-blue-500'
                onClick={() => navigate('/')}
            >
                Go Home
            </button>
        </div>
    );
}

export default NotFound;
