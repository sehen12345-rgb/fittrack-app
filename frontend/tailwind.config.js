/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        diet: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        bulk: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        maintenance: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08)',
        'blue': '0 4px 14px 0 rgb(37 99 235 / 0.25)',
      },
    },
  },
  plugins: [],
}
