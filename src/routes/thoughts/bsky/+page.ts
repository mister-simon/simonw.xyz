import { AtpAgent } from '@atproto/api';

export const load = async () => {
	const agent = new AtpAgent({ service: 'https://api.bsky.app' });
	const profile = agent.getProfile({ actor: 'simonw.xyz' });
	const feed = agent.getAuthorFeed({
		actor: 'simonw.xyz',
		filter: 'posts_no_replies'
	});

	return { profile, feed };
};
