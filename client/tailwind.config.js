export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d7377',
        'primary-light': '#14919b',
        'primary-dark': '#055b63',
        accent: '#d84d42',
        'accent-light': '#ff8c7a',
        'accent-soft': '#f4a0a0',
        mint: '#d4f1f4',
        'mint-light': '#e8f9fb',
        'text-dark': '#1a2e2e',
        'text-light': '#4a6c6f',
      },
      boxShadow: {
        glow: '0 24px 60px rgba(13, 115, 119, 0.12)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
