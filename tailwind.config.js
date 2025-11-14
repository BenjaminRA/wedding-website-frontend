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
        cream: '#F4F6F3',
        'forest-green': '#6B8068',
        'forest-light': '#8FA48C',
        'forest-dark': '#4A5947',
        'sage': '#9BAA97',
        'pine': '#556B52',
        'moss': '#7A8F77',
        'mist': '#E8EDE7',
        dark: '#2C2C2C',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
