import { mdsvex } from 'mdsvex';
import highlighter from './highlighter.js';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeAttrs from 'rehype-attr';

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
	// Custom sectionizer to wrap anything that isn't a custom component in a wrapper div
	[() => {
		return ({ type, children, position }) => {
			let newChildren = [];

			children.forEach(node => {
				if (node.type === 'text' && node.value.trim() === '') {
					return;
				}

				if (node.type === "raw") {
					newChildren.push(node);
					return;
				}

				if (newChildren.length === 0 || newChildren[newChildren.length - 1].type !== 'element') {
					newChildren.push({
						type: 'element',
						tagName: 'div',
						properties: {},
						children: []
					});
				}

				newChildren[newChildren.length - 1].children.push(node);
			});

			const out = {
				type,
				children: newChildren,
				position
			};

			return out;
		}
	}],
	[rehypeAttrs, { properties: 'attr' }],
	[rehypeToc],
];

const markdownPreprocessor = mdsvex({
	// layout: join(__dirname, "src/lib/mdsvex-document.svelte"),
	highlight: { highlighter },
	remarkPlugins,
	/* @ts-ignore */
	rehypePlugins
});

export default markdownPreprocessor;
