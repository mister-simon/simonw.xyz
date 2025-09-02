<script lang="ts">
	/** @ts-ignore */
	import { metadata as simonwxyz } from '$lib/pages/my-work/simonw.xyz.svx';
	import PortfolioItem from '$lib/portfolio/portfolio-item.svelte';
	const works = [{ data: simonwxyz, url: '/my-work/simonw.xyz.svx' }];
</script>

<svelte:head>
	<title>My Work - Simonw.xyz</title>
</svelte:head>

<div class="relative w-full overflow-clip">
	<div class="mx-8 prose py-8">
		<h2>My Work</h2>
		{#each works as item}
			<PortfolioItem {...item} />
		{/each}
	</div>
</div>
