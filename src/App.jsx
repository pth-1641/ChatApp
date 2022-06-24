import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RoomId from './pages/RoomId';
import NotFound from './pages/NotFound';

export const ModalContext = createContext();

function App() {
    const [displayModal, setDisplayModal] = useState('');

    return (
        <ModalContext.Provider value={{ displayModal, setDisplayModal }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/:roomId' element={<RoomId />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ModalContext.Provider>
    );
}

export default App;
