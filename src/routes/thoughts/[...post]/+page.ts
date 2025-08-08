import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	if (!params.post.endsWith('.svx')) {
		error(404, 'There are no thoughts here...');
	}

	const posts = import.meta.glob('$lib/posts/**/*.svx');
	const postKey = Object.keys(posts).find((path) => path.endsWith(params.post));

	if (!postKey) {
		error(404, 'No thought exists here...');
	}

	try {
		const post = await posts[postKey]();

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post }
		};
	} catch (err) {
		error(404, 'Unable to think');
	}
};
