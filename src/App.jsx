import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RoomId from './pages/RoomId';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/:roomId' element={<RoomId />} />
                <Route path='/' element={<Home />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
