import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import markdownPreprocessor from './mdsvex.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), markdownPreprocessor],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
