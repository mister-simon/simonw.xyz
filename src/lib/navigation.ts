class Group {
	title: any;
	children: any;
	constructor({ title, children }: { title: string; children: Item[] }) {
		this.title = title;
		this.children = children;
	}
}

class Item {
	title: any;
	details: any;
	constructor({ title, details }: { title: any; details: { type?: FileTypes } }) {
		this.title = title;
		this.details = details;
	}
}

type FileTypes = 'svelte' | 'txt' | 'img' | 'md';

const nav = [
	new Group({
		title: 'Home',
		children: [
			new Item({
				title: 'Index',
				details: { type: 'svelte' }
			}),
			new Item({
				title: 'Art',
				details: { type: 'txt' }
			})
		]
	}),
	new Group({
		title: 'My Work',
		children: [
			new Item({
				title: 'Index',
				details: { type: 'svelte' }
			}),
			new Item({
				title: 'Something Else',
				details: { type: 'svelte' }
			})
		]
	}),
	new Group({
		title: 'Thoughts',
		children: [
			new Item({
				title: 'Index',
				details: { type: 'svelte' }
			}),
			new Item({
				title: 'Something Else',
				details: { type: 'svelte' }
			})
		]
	}),
	new Group({
		title: 'Contact',
		children: [
			new Item({
				title: 'Index',
				details: { type: 'svelte' }
			}),
			new Item({
				title: 'Something Else',
				details: { type: 'svelte' }
			})
		]
	})
];

export default nav;
