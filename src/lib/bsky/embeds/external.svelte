<script lang="ts">
	import type { AppBskyEmbedExternal } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	const { embed, post }: { embed: AppBskyEmbedExternal.View; post: PostView } = $props();
</script>

<a
	href={embed.external.uri}
	target="_blank"
	class="group relative mx-4 mb-4 grid gap-0.5 overflow-clip rounded-lg border-2 border-popup-urgent-border bg-alternate-surface/25 p-4 text-alternate-text"
>
	<h3 class="external-link mb-2 text-lg font-bold">{embed.external.title}</h3>
	<p>{embed.external.description}</p>
	<div
		class="absolute inset-0 z-0 bg-linear-90 from-default-text/20 to-transparent duration-250 not-group-hover:-translate-x-full motion-safe:transition-transform"
	></div>
</a>
