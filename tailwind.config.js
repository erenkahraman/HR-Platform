/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		screens:{
			'sm': {'max': '419px'},
			// => @media (max-width: 639px) { ... }
			
			'md': {'min': '420px'},
			// => @media (max-width: 767px) { ... }
			
			'lg': {'min': '1280px'},
			// => @media (max-width: 1023px) { ... }

		},
	},
	plugins: [require("@tailwindcss/forms")],
};
