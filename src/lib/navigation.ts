export class TreeNode {
	#listing: string | null = null;
	#name: string | null = null;
	#children: { [key: string]: TreeNode } = {};
	#parent: TreeNode | null;
	#active: boolean = false;

	constructor(parent: TreeNode | null = null) {
		this.#parent = parent;
	}

	setListing(listing: string) {
		this.#listing = listing;
	}

	setName(name: string) {
		this.#name = name;
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

	get name() {
		return this.#name;
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

		if (url.startsWith('/')) {
			return url;
		}

		return `/${url}`;
	}

	tree(): {
		listing: string | null;
		name: string | null;
		url: string | null;
		children: { [key: string]: ReturnType<TreeNode['tree']> };
	} {
		return {
			listing: this.#listing,
			name: this.#name,
			url: this.url,
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
	const postPaths = Object.keys(import.meta.glob('$lib/posts/*.svx')).map((path) =>
		path.replace(/^\/src\/lib\/posts\//, 'thoughts/').replace(/\.svx$/, '')
	);

	const sveltePaths = Object.keys(import.meta.glob('/src/routes/*/**/+page.svelte')).map((path) =>
		path.replace(/^\/src\/routes\//, '')
	);

	// Get pages from svelte files
	return [...sveltePaths, ...postPaths].reduce((tree, path) => {
		let item = tree;

		const parts = path.split('/');

		parts.forEach((part, i) => {
			let param = part.match(/^\[(.+)\]$/);
			if (param?.length) {
				console.log('AH', param);
				return;
			}
			item = item.getChild(part) ?? item.addChild(part, new TreeNode(item));
			item.setListing(parts.slice(0, i + 1).join('/'));
			item.setName(part);
		});

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

	const svelteNode = node.getChild('+page.svelte') ?? null;

	if (svelteNode) {
		node = svelteNode;
		node.setActive(true);
	}

	let primary = { ...node?.parent?.siblings };

	if (node?.parent?.parent && node.parent.parent.listing) {
		primary.parent = new TreeNode();
		primary.parent.setName('../');
		primary.parent.setListing(node.parent.parent.listing);
	}

	let secondary = node?.siblings;

	if (node === root) {
		secondary = root.children;
	}

	return {
		root: root,
		primary,
		secondary,
		current: node
	};
}
