/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        "primary": "#0b3c95",    
        "secondary": "#84d2f3",                
        "accent": "#fdd231",                
        "neutral": "#e5e7eb",
                
        "base-100": "#1b44a6",
                
        "info": "#8DCAC1",
                
        "success": "#d9f99d",
                
        "warning": "#fe4135",
                
        "error": "#dc2626",
                },
              },
            ],
          }, 
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
