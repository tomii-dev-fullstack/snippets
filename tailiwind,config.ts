/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',  // Rutas para el enrutamiento de Next.js 13+ (con `src/app`)
      './src/components/**/*.{js,ts,jsx,tsx}',  // Si tienes componentes en `src/components`
      './src/pages/**/*.{js,ts,jsx,tsx}',  // Si usas `src/pages/`
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
          body: ['Open Sans', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  