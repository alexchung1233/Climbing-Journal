/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    flowbite.plugin(),
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};
