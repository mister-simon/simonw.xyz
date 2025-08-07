/* type Listing = {
	name: string;
	path: string;
	type: 'file' | 'folder';
	children?: Listing[];
};

function createListing(parts: string[]) {
	console.log(parts);
	const [part, ...remainder] = parts;

	return {
		name: part,
		url: parts.join('/'),
		parents: remainder.length ? createListing(remainder) : null
	};
} */

/**
 * Create a list of page urls
 */
function pageCollection(): string[] {
	// Get pages from svelte files
	return Object.keys(import.meta.glob('/src/routes/*/**/+page.svelte'))
		.map((path) => path.replace(/^\/src\/routes\//, ''))
		.reduce(
			(pages, path) => {
				let node = pages;

				for (const part of path.split('/')) {
					if (part.endsWith('.svelte')) {
						(node as { listing?: string }).listing = path;
						break;
					}

					if ((node as { children?: any }).children) {
						node = (node as { children: any }).children;
					}

					if (!Object.hasOwn(node, part)) {
						node[part] = {
							listing: null,
							children: {}
						};
					}

					node = node[part];
				}

				return pages;
			},
			{ listing: null, children: {} }
		);
}

export function handle(pathname: string) {
	const currentPath = pathname.replace(/^\/+/, '').split('/');

	// Take the list of paths, and reduce them down to leaf nodes
	const pages = pageCollection();
}
