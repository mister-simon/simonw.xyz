import { findPage } from '$lib/svx-page.js';

export const load = async ({ params }) => {
	return findPage(`/about/${params.post}`);
};
