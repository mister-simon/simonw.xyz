<script lang="ts">
	import type { AppBskyEmbedImages } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	const { embed, post }: { embed: AppBskyEmbedImages.View; post: PostView } = $props();
</script>

<div
	class="images mx-4 mb-4 grid gap-0.5 overflow-clip rounded-lg border-2 border-popup-urgent-border bg-popup-urgent-border"
>
	{#each embed.images as image}
		<a href={image.fullsize} target="_blank" rel="noopener noreferrer">
			<img src={image.thumb} alt={image.alt} class="size-full object-cover" />
		</a>
	{/each}
</div>

<style>
	.images:has(> a:nth-child(2)) {
		grid-template-columns: repeat(2, 1fr);
	}
</style>
