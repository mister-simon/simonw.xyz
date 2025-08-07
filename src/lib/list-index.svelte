<script lang="ts">
	import ListItem from './list-item.svelte';
	import type { TreeNode } from './navigation';

	let {
		items
	}: {
		items: Record<string, TreeNode> | undefined;
	} = $props();
</script>

<ul class="inner">
	{#if items}
		{#each Object.values(items) as item}
			<ListItem {item} />
		{/each}
	{/if}
</ul>

<style>
	.inner {
		position: relative;
		height: 100%;
		max-width: 100%;
		overflow: auto;
	}
</style>
