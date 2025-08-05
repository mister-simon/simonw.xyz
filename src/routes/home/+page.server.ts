import { read } from '$app/server';
import artPath from '$lib/assets/logo-42.txt';

export const load = async () => {
	return {
		art: await read(artPath).text()
	};
};
