/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#078203',
                    light: '#09A604', // Calculated lighter shade
                    dark: '#056002',  // Calculated darker shade
                },
                background: {
                    DEFAULT: '#FFFFFF',
                    light: '#F8F9FA',
                },
                text: {
                    DEFAULT: '#2D3436',
                    light: '#636E72',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
