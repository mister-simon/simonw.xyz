<script lang="ts">
	import ListItem from '$lib/navigation/list-item.svelte';
	import type { TreeNode } from '$lib/navigation/TreeNode';

	let {
		items,
		useAriaCurrent = false
	}: {
		items: TreeNode[];
		useAriaCurrent?: boolean;
	} = $props();
</script>

<ul class="inner @container">
	{#each items as item}
		<ListItem {item} {useAriaCurrent} />
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
