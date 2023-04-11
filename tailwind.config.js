module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
      extend: {
        gridTemplateColumns: {
          sidebar: "300px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
        }, 
        gridTemplateRows: {
          header: "64px auto", // 👈 for the navbar layout. adds grid-rows-header class
        },

        colors: {
          'cougar-red': '#c8102e',
          'cougar-dark-red': '#960c22',
          'bright-white': '#ffffff',
          'hover-white': '#eaeded',
          'friendly-black': '#121212',
          'friendly-grey': '#f2f2f2',
          'friendly-black2': '#919191',
        },

      },
    },
    variants: {
      extend: {},
    },
    plugins: [],


  }

  