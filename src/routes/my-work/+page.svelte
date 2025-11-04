<script lang="ts">
	import { findPage } from '$lib/svx-page';
	import PortfolioItem from '$lib/portfolio/portfolio-item.svelte';

	let { data: pageData } = $props();
	const works = $derived(pageData.works);
</script>

<svelte:head>
	<title>My Work - Simonw.xyz</title>
</svelte:head>

{#snippet section({
	title,
	extract,
	items
}: {
	title: string;
	extract: string;
	items: {
		data: any;
		url: any;
	}[];
})}
	{#if items.length}
		<section>
			<h2>{title}</h2>
			<p>{extract}</p>
			<div class="grid gap-8 @2xl:grid-cols-2">
				{#each items as item}
					<PortfolioItem {...item} />
				{/each}
			</div>
		</section>
	{/if}
{/snippet}

<div class="relative w-full overflow-clip">
	<div class="mx-8 prose max-w-none py-8">
		<h1>My Work</h1>
		{#await works then sections}
			{@render section({
				title: 'Featured',
				extract: 'Some of my personal favourites:',
				items: sections.featured ?? []
			})}
			{@render section({
				title: 'Creative',
				extract: 'Experiments and fun things:',
				items: sections.creative ?? []
			})}
			{@render section({
				title: 'Other',
				extract: 'Uncategorised or otherwise hard to describe:',
				items: sections.other ?? []
			})}
		{/await}
	</div>
</div>
