<script lang="ts">
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
	import BskyRichtext from './richtext.svelte';
	import BskyEmbed from './embed.svelte';
	import { getPostUrl } from './post';

	const { post }: { post: PostView } = $props();
	const url = $derived(getPostUrl(post));
</script>

<article class="relative mx-auto max-w-prose">
	<div
		class="mx-2 flex rounded-t-lg border-2 border-b-0 border-popup-incomplete bg-popup-surface-color"
	>
		<figure
			class="grid aspect-square shrink-0 place-content-center overflow-clip bg-popup-incomplete p-1"
		>
			<img
				src={post.author.avatar}
				alt=""
				class="aspect-square size-8 rounded-full border border-00"
			/>
		</figure>
		<div class="prose grow px-4 py-2">
			<p class="text-sm">
				<a href={`https://bsky.app/profile/${post.author.handle}`}>@{post.author.handle}</a>
				{#if post?.record?.createdAt}
					({new Date(String(post.record.createdAt)).toLocaleDateString()})
				{/if}
			</p>
		</div>
		<a
			href={url}
			target="_blank"
			class="group relative grid aspect-square place-content-center overflow-clip border-l-2 border-popup-incomplete bg-popup-incomplete after:absolute after:inset-0"
		>
			<div class="grid size-8 place-content-center">
				<span
					class="icon z-10 iconify size-4 origin-bottom-left transition-transform duration-250 pixel--bluesky group-hover:-skew-x-12"
					>View on Bsky</span
				>
			</div>
			<div
				class="absolute inset-0 z-0 bg-linear-90 from-default-text/20 to-transparent duration-250 not-group-hover:-translate-x-full motion-safe:transition-transform"
			></div>
		</a>
	</div>
	<div class="overflow-clip rounded-lg border-2 border-popup-incomplete bg-popup-surface-color">
		<blockquote>
			<div class="mx-auto prose grow p-8 text-pretty">
				{#if post.record.text}
					<BskyRichtext text={String(post.record.text)} />
				{/if}
			</div>
		</blockquote>
		{#if post?.embed}
			<BskyEmbed {post} />
		{/if}
	</div>
</article>
