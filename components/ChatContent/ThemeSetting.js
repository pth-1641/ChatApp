import { colors } from '../../constant/colors';
import { MdCheck } from 'react-icons/md';

function ThemeSetting({ setShowSetting, currentTheme }) {
    return (
        <ul className='flex flex-wrap mt-2 gap-1'>
            {colors.map((color) => (
                <li
                    className='rounded-full p-5 relative'
                    style={{ backgroundColor: color }}
                    onClick={() => console.log(color)}
                >
                    <span className='absolute inset-0 flex-center text-2xl'>
                        {color === currentTheme ? <MdCheck /> : ''}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default ThemeSetting;
