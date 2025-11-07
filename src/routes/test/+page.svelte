<script lang="ts">
	import { Agent, AtpAgent } from '@atproto/api';
	import type { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';

	const agent = new AtpAgent({ service: 'https://api.bsky.app' });
	const user = await agent.getProfile({ actor: 'simonw.xyz' });
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
	<div
		class="group relative isolate grid grid-rows-5 overflow-clip rounded-lg border-2 border-alternate-text bg-alternate-surface no-underline hover:border-focused-window"
	>
		<figure class="mask-pixels-btm col-start-1 row-start-1 row-end-3 m-0!">
			<img
				src={banner}
				alt=""
				class="m-0 aspect-video w-full origin-(--transform-origin,top_left) object-cover object-top"
			/>
		</figure>
		<div class="z-10 col-start-1 row-start-2 row-end-5 grid justify-start p-8">
			<div class="grid grid-cols-5 items-center">
				<figure
					class="col-span-2 aspect-square overflow-clip rounded-full border-4 border-default-surface"
				>
					<img src={avatar} alt="" class="rounded-full" />
				</figure>
				<div class="col-span-3 px-4 pt-2 pb-4">
					<h2>{handle} - {displayName}</h2>
					<small>{postsCount} posts</small>
					<p>{description}</p>
				</div>
			</div>
		</div>
	</div>
{/snippet}

<div class="relative w-full">
	<div class="mx-8 prose max-w-none py-8">
		{@render userCard(user.data)}
	</div>
</div>
