import { mdsvex } from 'mdsvex';
import highlighter from './highlighter.js';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeToc from "@jsdevtools/rehype-toc";
import sectionize from "@hbsnow/rehype-sectionize";

const remarkPlugins = [remarkGfm];
const rehypePlugins = [
	[rehypeSlug],
	[rehypeAutoLinkHeadings, { behavior: 'wrap' }],
	[
		rehypeExternalLinks,
		{
			rel: 'nofollow noopener',
			target: '_blank'
		}
	],
	[sectionize, {
		enableRootSection: true
	}],
	[rehypeToc]
];

const markdownPreprocessor = mdsvex({
	highlight: { highlighter },
	remarkPlugins,
	/* @ts-ignore */
	rehypePlugins
});

export default markdownPreprocessor;
