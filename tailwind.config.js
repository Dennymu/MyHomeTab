/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        default: '#9CC3D2',
      },
      backgroundImage: {
        shark: "url('/images/shark.jpg')"
      },
      color: {
        text: '#212121',
      }
    },
  },
  plugins: [],
}

