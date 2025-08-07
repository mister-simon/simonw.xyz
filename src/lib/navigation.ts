export class TreeNode {
	#listing: string | null = null;
	#children: { [key: string]: TreeNode } = {};
	#parent: TreeNode | null;
	#active: boolean = false;

	constructor(parent: TreeNode | null = null) {
		this.#parent = parent;
	}

	setListing(listing: string) {
		this.#listing = listing;
	}

	addChild(key: string, child: TreeNode) {
		this.#children[key] = child;
		return child;
	}

	setActive(isActive: boolean) {
		this.#active = isActive;
	}

	getChild(key: string): TreeNode | null {
		return this.#children[key] ?? null;
	}

	get listing() {
		return this.#listing;
	}

	get parent() {
		return this.#parent;
	}

	get active() {
		return this.#active;
	}

	get children() {
		return this.#children;
	}

	get siblings() {
		return this.#parent?.children;
	}

	get url() {
		if (!this.listing) {
			return null;
		}

		const url = this.listing.replace('/+page.svelte', '');

		return `/${url}`;
	}

	get name() {
		if (!this.listing) {
			return 'N/A?';
		}

		// if (this.listing?.endsWith('+page.svelte')) {
		// 	return 'Index';
		// }

		const parts = this.listing.split('/');

		return parts.shift();
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
export function getTree(): TreeNode {
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

export function getNavData(pathname: string) {
	const root = getTree();

	const currentPath = pathname.replace(/^\/+/, '').split('/');

	let node = root;
	for (const part of currentPath) {
		node = node.getChild(part) ?? node;
		node.setActive(true);
	}

	return {
		root: root,
		primary: node?.parent?.siblings,
		secondary: node?.siblings,
		current: node
	};
}
