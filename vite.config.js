import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	build: {
		minify: 'esbuild',
		target: 'esnext'
	}
};

export default config;
