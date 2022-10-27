import { defineConfig } from 'vite-plugin-windicss';
import forms from 'windicss/plugin/forms';

export default defineConfig({
	theme: {
		extend: {
			colors: {
				primary: '#C8EE44',
				secondary: '#F2C94C',
			},
		},
	},
	plugins: [forms],
	attributify: true,
});
