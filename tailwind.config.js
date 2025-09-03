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
        'bg': 'hsl(210, 36%, 96%)',
        'accent': 'hsl(340, 71%, 51%)',
        'primary': 'hsl(217, 70%, 50%)',
        'surface': 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(222, 47%, 11%)',
        'text-secondary': 'hsl(224, 20%, 55%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(222, 47%, 11%, 0.08)',
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
