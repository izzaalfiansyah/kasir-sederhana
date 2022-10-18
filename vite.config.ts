import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import windicssPlugin from 'vite-plugin-windicss';

export default defineConfig({
	plugins: [solidPlugin(), windicssPlugin()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
