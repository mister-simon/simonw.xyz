import { redirect } from '@sveltejs/kit';

export const load = async ({ params, route, url }) => {
	const { pathname } = url;

	if (pathname === '/') {
		redirect(307, '/home');
	}

	return {};
};
