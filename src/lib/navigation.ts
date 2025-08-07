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

class TreeNode {
	#listing: string | null = null;
	#children: { [key: string]: TreeNode } = {};
	#parent: TreeNode | null;

	constructor(parent: TreeNode | null = null) {
		this.#parent = parent;
	}

	setListing(listing: string) {
		this.#listing = listing;
	}

	addChild(key: string, listing: TreeNode) {
		this.#children[key] = listing;
		return listing;
	}

	getChild(key: string): TreeNode | null {
		return this.#children[key] ?? null;
	}

	get children() {
		return this.#children;
	}

	get siblings() {
		return this.#parent?.children;
	}

	tree(): { listing: string | null; children: { [key: string]: ReturnType<TreeNode['tree']> } } {
		return {
			listing: this.#listing,
			children: Object.keys(this.#children).reduce(
				(result, key) => {
					return {
						...result,
						[key]: this.#children[key]?.tree()
					};
				},
				{} as { [key: string]: ReturnType<TreeNode['tree']> }
			)
		};
	}
}

/**
 * Create a list of page urls
 */
function getTree(): TreeNode {
	// Get pages from svelte files
	return Object.keys(import.meta.glob('/src/routes/*/**/+page.svelte'))
		.map((path) => path.replace(/^\/src\/routes\//, ''))
		.reduce((tree, path) => {
			let item = tree;

			for (const part of path.split('/')) {
				if (part.endsWith('.svelte')) {
					item.setListing(path);

					break;
				}

				item = item.getChild(part) ?? item.addChild(part, new TreeNode(item));
			}

			return tree;
		}, new TreeNode());
}

export function handle(pathname: string) {
	const currentPath = pathname.replace(/^\/+/, '').split('/');

	// Get the entire app as a class tree
	const root = getTree();

	console.log(root.tree());
}
