import { findPage } from '$lib/svx-page';

export const load = async () => {
	// TODO: Move all of the page setup stuff here
	const pages = Promise.all(
		Object.keys(import.meta.glob('$lib/pages/my-work/*.svx')).map((path) =>
			findPage(path.replace(/^\/src\/lib\/pages\//, ''))
		)
	);

	const items = (await pages).map(({ meta }) => ({ data: meta, url: meta.slug }));
	const works = Object.groupBy(items, ({ data }) => data.section ?? 'other');

	return { works };
};
