import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { transformerNotationDiff } from '@shikijs/transformers';
import { transformerNotationHighlight } from '@shikijs/transformers';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';

const remarkPlugins = [
	remarkGfm
];

const rehypePlugins = [
	rehypeSlug
];

async function highlighter(code, lang = "text") {
	const theme = (await import('shiki/themes/material-theme-ocean.mjs')).default;
	const shiki = await getSingletonHighlighter({
		theme,
		langs: Object.keys(bundledLanguages),
		transformers: [
			transformerNotationDiff(),
			transformerNotationHighlight(),
		]
	})
	const html = escapeSvelte(shiki.codeToHtml(code, { lang, theme }))
	return `{@html \`${html} \` }`;
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		highlight: { highlighter },
		remarkPlugins,
		rehypePlugins,
	})],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
