<script lang="ts">
	import ListItem from './list-item.svelte';
	import type { TreeNode } from './TreeNode';

	let {
		items,
		useAriaCurrent = false
	}: {
		items: TreeNode[];
		useAriaCurrent?: boolean;
	} = $props();
</script>

<ul class="inner">
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
