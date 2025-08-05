<script lang="ts">
	import ListItem from './list-item.svelte';

	let { items } = $props();
</script>

<ul class="inner">
	{#each items as item}
		<ListItem {item} />
	{/each}
</ul>

<style>
	.inner {
		position: relative;
		height: 100%;
		max-width: 100%;
		overflow: auto;
	}
</style>
