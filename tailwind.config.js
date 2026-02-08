/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brutal-black': '#050505',
                'brutal-purple': '#7c3aed',
                'brutal-white': '#f5f5f5',
                'brutal-gray': '#1a1a1a',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'mono': ['Space Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
