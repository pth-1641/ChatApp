/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                dark: '#1e1b2e',
                lightDark: '#343142',
            },
        },
    },
    plugins: [],
};
