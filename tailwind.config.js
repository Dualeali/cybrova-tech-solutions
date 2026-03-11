/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-dark': '#0d0514',
                'brand-purple': '#2b0a3d',
                'brand-accent': '#7a3cff',
                'brand-neon': '#ccff00',
                'brand-neon-light': '#00ff88',
                'coffee-brown': '#3e2723',
                'warm-gold': '#ffb300',
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'glow': 'glow 3s ease-in-out infinite alternate',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                glow: {
                    '0%': { opacity: '0.5', boxShadow: '0 0 10px rgba(122, 60, 255, 0.4)' },
                    '100%': { opacity: '1', boxShadow: '0 0 25px rgba(122, 60, 255, 0.8)' },
                }
            }
        },
    },
    plugins: [],
}
