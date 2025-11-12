import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

export function getPostUrl(post: PostView) {
	const author = post.author.handle;
	const postId = post.uri.split('/').pop();
	return `https://bsky.app/profile/${author}/post/${postId}`;
}
