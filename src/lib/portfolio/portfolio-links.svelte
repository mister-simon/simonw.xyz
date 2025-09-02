<script>
	let { links } = $props();
	import PortfolioLink from '$lib/portfolio/portfolio-link.svelte';
</script>

{#each links as link}
	<PortfolioLink {...link} />
{/each}
