import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	server: {
		allowedHosts: ['to-do-list-project-pc4p.onrender.com'],
	},
	plugins: [react(), tailwindcss()],
});
