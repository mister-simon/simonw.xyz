import { error } from '@sveltejs/kit';

export async function findPage(post: string) {
	if (!post.endsWith('.svx')) {
		error(404, 'There are no thoughts here...');
	}

	const posts = import.meta.glob('$lib/pages/**/*.svx');
	const postKey = Object.keys(posts).find((path) => path.endsWith(post));

	if (!postKey) {
		error(404, 'No thought exists here...');
	}

	try {
		const postModule = await posts[postKey]();

		return {
			PostContent: postModule.default,
			meta: { ...postModule.metadata, slug: post }
		};
	} catch (err) {
		error(404, 'Unable to think');
	}
}
