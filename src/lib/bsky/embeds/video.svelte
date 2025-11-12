<script lang="ts">
	import type { AppBskyEmbedVideo } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
	import { getPostUrl } from '../post';

	const { embed, post }: { embed: AppBskyEmbedVideo.View; post: PostView } = $props();
	const url = $derived(getPostUrl(post));
</script>

<div
	class="mx-4 mb-4 grid gap-0.5 overflow-clip rounded-lg border-2 border-popup-urgent-border bg-popup-urgent-border"
>
	<a
		href={url}
		target="_blank"
		class="relative overflow-hidden"
		style={embed.aspectRatio &&
			`aspect-ratio: ${embed.aspectRatio.width} / ${embed.aspectRatio.height};`}
	>
		<img src={embed.thumbnail} alt={embed.alt} class="size-full object-cover" />
		<div
			class="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50"
		>
			<img
				alt=""
				src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%23fff'%20d='M9.576%202.534C7.578%201.299%205%202.737%205%205.086v13.828c0%202.35%202.578%203.787%204.576%202.552l11.194-6.914c1.899-1.172%201.899-3.932%200-5.104L9.576%202.534Z'/%3e%3c/svg%3e"
				class="size-3/5 object-cover"
			/>
		</div>
	</a>
</div>
