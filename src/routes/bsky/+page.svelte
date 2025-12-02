<script lang="ts">
	import type { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
	import Post from '$lib/bsky/post.svelte';

	let { data: pageData } = $props();
	const profile = $derived(pageData.profile);
	const feed = $derived(pageData.feed);
</script>

<svelte:head>
	<title>Bluesky Feed - Simonw.xyz</title>
</svelte:head>

{#snippet userCard({
	handle,
	displayName,
	banner,
	avatar,
	description,
	postsCount
}: ProfileViewDetailed)}
	<div class="bg-alternate-surface text-alternate-text [--mask-height:4rem]">
		<figure class="mask-pixels-btm max-h-[50cqh] w-full overflow-clip">
			<img src={banner} alt="" class="size-full object-cover object-(--position,center)" />
		</figure>
		<div class="relative isolate flex place-content-center gap-8 p-8">
			<figure
				class="aspect-square h-[15cqh] flex-initial overflow-clip rounded-full border-4 border-default-surface"
			>
				<img src={avatar} alt="" class="rounded-full" />
			</figure>
			<div class="prose">
				<h1 class="text-balance">
					{handle} - {displayName}
				</h1>
				<p>{description}</p>
				<p class="text-right text-xs">
					<small>{postsCount} posts</small>
				</p>
			</div>
		</div>
	</div>
{/snippet}

<div class="relative w-full">
	{#await profile then { data: profile }}
		{@render userCard(profile)}
	{/await}

	<h2 class="mx-8 mt-12 text-center text-3xl text-balance">Posts and Reposts</h2>

	{#await feed then { data: feed }}
		<div class="m-8 space-y-8">
			{#each feed.feed as { post }}
				<Post {post} />
			{/each}
		</div>
	{/await}
</div>
