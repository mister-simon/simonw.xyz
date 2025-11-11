<script lang="ts">
	import type { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
	import AtprotoRichtext from '$lib/atproto-richtext.svelte';

	let { data: pageData } = $props();
	const profile = $derived(pageData.profile);
	const feed = $derived(pageData.feed);
</script>

<svelte:head>
	<title>Atproto Test - Simonw.xyz</title>
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
		<div class="m-8 grid gap-8">
			{#each feed.feed as { post }}
				<article>
					<blockquote
						class="relative flex rounded-lg border-2 border-popup-incomplete bg-popup-surface-color"
					>
						<div class="mx-auto prose grow p-8">
							{#if post.record.text}
								<AtprotoRichtext text={String(post.record.text)} />
							{/if}
						</div>
						<div class="relative flex">
							<a
								href={`https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`}
								target="_blank"
								class="group grid place-content-center overflow-clip border-l-2 border-popup-incomplete bg-popup-incomplete p-8 text-center after:absolute after:inset-0 hover:bg-default-surface hover:text-default-text"
							>
								<span
									class="icon iconify size-8 origin-bottom-left transition-transform duration-500 pixel--bluesky group-hover:-skew-x-12"
									>View on Bsky</span
								>
							</a>
						</div>
					</blockquote>
					{#if post?.record?.createdAt}
						<div class="prose ml-auto">
							<p class="text-right text-sm">
								<a href={`https://bsky.app/profile/${post.author.handle}`}>@{post.author.handle}</a>
								({new Date(String(post.record.createdAt)).toLocaleDateString()})
							</p>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	{/await}
</div>
