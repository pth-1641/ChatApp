import { colors } from '../../../constants/colors';
import { MdCheck } from 'react-icons/md';
import { updateTheme } from '../../../firebase/functionHandler';
import { useLocation } from 'react-router-dom';

function ThemeSetting({ currentTheme }) {
    const location = useLocation();
    const roomId = location.pathname.slice(1);

    const handleUpdateTheme = (color) => {
        updateTheme(roomId, color);
    };

    return (
        <ul className='flex flex-wrap mt-2 gap-1'>
            {colors.map((color) => (
                <li
                    key={color}
                    className='rounded-full p-5 relative'
                    style={{ backgroundColor: color }}
                    onClick={() => handleUpdateTheme(color)}
                >
                    <span className='absolute inset-0 flex-center text-2xl cursor-pointer'>
                        {color === currentTheme ? <MdCheck /> : ''}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default ThemeSetting;
