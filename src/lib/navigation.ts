import { page } from '$app/state';

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

	get icon() {
		const specialIcons = {
			home: 'pixel--home-solid',
			'my-work': 'pixel--sparkles-solid',
			thoughts: 'pixel--book-heart-solid',
			contact: 'pixel--user-solid',
			'+page.svelte': 'pixel--code-block',
			'+error.svelte': 'pixel--exclamation-triangle-solid'
		};

		if (this.name && Object.hasOwn(specialIcons, this.name)) {
			return specialIcons[this.name as keyof typeof specialIcons];
		}

		if (this.name?.endsWith('.svx')) {
			return 'pixel--writing';
		}

		if (Object.values(this.children).length !== 0) {
			return this.active ? 'pixel--folder-open-solid' : 'pixel--folder-solid';
		}

		return '';
	}

	get order() {
		const specialOrder = {
			'../': 0,
			home: 100,
			'my-work': 200,
			thoughts: 300,
			contact: 400,
			'+page.svelte': 500,
			'+error.svelte': 600
		};

		if (this.name && Object.hasOwn(specialOrder, this.name)) {
			return specialOrder[this.name as keyof typeof specialOrder];
		}

		if (Object.values(this.children).length !== 0) {
			return 450;
		}

		return 550;
	}

	get url() {
		if (!this.listing) {
			return null;
		}

		const url = this.listing.replace('/+page.svelte', '');

		return url.startsWith('/') ? url : `/${url}`;
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

export function sortMenu(menu: TreeNode[]) {
	return menu.sort(function (a, b) {
		if (a.order === b.order) {
			return (a.listing ?? '').localeCompare(b.listing ?? '', 'en-GB', { numeric: true });
		}

		return a.order - b.order;
	});
}

/**
 * Create a list of page urls
 */
export function getTree(): TreeNode {
	const postPaths = Object.keys(import.meta.glob('$lib/posts/**/*.svx')).map((path) =>
		path.replace(/^\/src\/lib\/posts\//, 'thoughts/')
	);

	const sveltePaths = Object.keys(import.meta.glob(['/src/routes/*/**/+page.svelte']))
		.filter((path) => !path.includes('[...post]'))
		.map((path) => path.replace(/^\/src\/routes\//, ''));

	return [...sveltePaths, ...postPaths].reduce((tree, path) => {
		let item = tree;

		const parts = path.split('/');

		parts.forEach((part, i) => {
			item = item.getChild(part) ?? item.addChild(part, new TreeNode(item));
			item.setListing(parts.slice(0, i + 1).join('/'));
			item.setName(part);
		});

		return tree;
	}, new TreeNode());
}

export function getNavData(pathname: string) {
	const root = getTree();

	// Move through path segments along the nav tree, highlighting active nodes.
	// When complete, the node will be the furthest node along the tree.
	const currentPath = pathname.replace(/^\/+/, '').split('/');

	let node = root;
	for (const part of currentPath) {
		node = node.getChild(part) ?? node;
		node.setActive(true);
	}

	// Svelte pages act like index pages. So highlight one if the current node has one.
	const svelteNode = node.getChild('+page.svelte') ?? null;

	if (svelteNode) {
		node = svelteNode;
		node.setActive(true);
	}

	// Primary menu shows siblings of parent
	let primary = Object.values(node?.parent?.siblings ?? {});

	// Add a "../" entry unless primary is a root
	if (node?.parent?.parent && node.parent.parent.listing) {
		const parentNode = new TreeNode();
		parentNode.setName('../');
		parentNode.setListing(node.parent.parent.listing);
		primary.push(parentNode);
	}

	// Secondary menu shows siblings of current node
	let secondary = Object.values(node?.siblings ?? {});

	// Something's gone wrong and we're at the root.
	// This makes sure something gets shown
	if (node === root) {
		secondary = Object.values(root.children);
	}

	// Add an error listing to secondary menu
	if (page.error && secondary && Object.values(node.children).length === 0) {
		for (const node in secondary) {
			secondary[node].setActive(false);
		}

		const errorNode = new TreeNode();
		errorNode.setName('+error.svelte');
		// errorNode.setListing('+error.svelte');
		errorNode.setActive(true);

		secondary.push(errorNode);
	}

	return {
		root: root,
		primary: sortMenu(primary),
		secondary: sortMenu(secondary),
		current: node
	};
}
