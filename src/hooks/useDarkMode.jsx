import { useState, useEffect } from 'react';

function useDarkMode() {
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.theme ?? 'dark'
    );
    const theme = currentTheme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        if (!localStorage.theme) {
            localStorage.theme = 'dark';
        }
    }, []);

    useEffect(() => {
        const bodyEle = document.body;
        bodyEle.classList.add(currentTheme);
        bodyEle.classList.remove(theme);
    }, [theme, currentTheme]);

    return [theme, setCurrentTheme];
}

export default useDarkMode;
