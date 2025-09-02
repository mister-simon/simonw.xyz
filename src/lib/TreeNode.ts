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

	get displayName() {
		if (Object.keys(this.#children).length && this.name?.match(/\..+$/) === null) {
			return `${this.name}/`;
		}

		if (this.#name?.endsWith('+page.svelte')) {
			return this.#name.replace(/\+page.svelte$/, 'Index');
		}

		if (this.#name?.endsWith('.svx')) {
			return this.#name.replace(/\.svx$/, '');
		}

		return this.name;
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
