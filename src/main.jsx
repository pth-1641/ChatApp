import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import './styles/tailwind.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RoomId from './pages/RoomId';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/:roomId' element={<RoomId />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
