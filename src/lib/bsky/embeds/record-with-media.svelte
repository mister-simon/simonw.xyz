<script lang="ts">
	import { type AppBskyEmbedRecordWithMedia } from '@atproto/api';
	import { isViewRecord } from '@atproto/api/dist/client/types/app/bsky/embed/record';
	import { type PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
	import Post from '../post.svelte';

	const { embed, post }: { embed: AppBskyEmbedRecordWithMedia.View; post: PostView } = $props();
	const media = $derived(embed.media);
	const postView = $derived.by(() => {
		if (!isViewRecord(embed.record.record)) {
			return null;
		}

		const viewRecord = embed.record.record;

		const record: PostView = {
			$type: 'app.bsky.feed.defs#postView',
			uri: viewRecord.uri,
			cid: viewRecord.cid,
			author: viewRecord.author,
			record: viewRecord.value,
			embed: viewRecord.embeds?.[0],
			// bookmarkCount: ,
			replyCount: viewRecord.replyCount,
			repostCount: viewRecord.repostCount,
			likeCount: viewRecord.likeCount,
			quoteCount: viewRecord.quoteCount,
			indexedAt: viewRecord.indexedAt,
			// viewer?:
			labels: viewRecord.labels
			// threadgate?: ThreadgateView
		};
		return record;
	});
</script>

<div class="relative mx-4 mb-4 grid gap-0.5 overflow-clip rounded-lg p-4">
	{#if postView}
		<Post post={postView} />
	{/if}
</div>
