import { useState, useEffect } from 'react';

function useDarkMode() {
    const [theme, setTheme] = useState('dark');
    const colorTheme = theme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        const root = window.document.body;
        root.classList.add(theme);
        root.classList.remove(colorTheme);
    }, [theme, colorTheme]);

    return [setTheme, colorTheme];
}

export default useDarkMode;
