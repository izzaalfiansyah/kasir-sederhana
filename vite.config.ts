import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windi from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), windi()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
