import { transformerNotationDiff } from '@shikijs/transformers';
import { transformerNotationHighlight } from '@shikijs/transformers';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';

import theme from 'shiki/themes/material-theme-ocean.mjs';

async function highlighter(code, lang) {
	const shiki = await getSingletonHighlighter({
		themes: [theme],
		langs: Object.keys(bundledLanguages)
	});

	const html = escapeSvelte(
		shiki.codeToHtml(code, {
			lang: lang ?? 'text',
			theme,
			transformers: [transformerNotationDiff(), transformerNotationHighlight()]
		})
	);
	return `{@html \`${html} \`}`;
}

export default highlighter;
