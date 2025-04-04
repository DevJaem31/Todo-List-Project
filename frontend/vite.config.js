import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	server: {
		allowedHosts: ['https://to-do-list-project-pc4p.onrender.com'],
	},
	plugins: [react(), tailwindcss()],
});
