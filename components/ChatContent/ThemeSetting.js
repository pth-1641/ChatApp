import { colors } from '../../constant/colors';
import { MdCheck } from 'react-icons/md';
import { updateTheme } from '../../firebase/dbInteract';
import { useRouter } from 'next/router';

function ThemeSetting({ currentTheme }) {
    const router = useRouter();
    const { roomId } = router.query;

    const handleUpdateTheme = (color) => {
        updateTheme(roomId, color);
    };

    return (
        <ul className='flex flex-wrap mt-3 gap-1'>
            {colors.map((color) => (
                <li
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
