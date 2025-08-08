<script lang="ts">
	import ListItem from './list-item.svelte';
	import type { TreeNode } from './navigation';

	let {
		items,
		useAriaCurrent = false
	}: {
		items: Record<string, TreeNode> | undefined;
		useAriaCurrent?: boolean;
	} = $props();

	const list = $derived.by(() => {
		const listItems = items ?? {};

		return Object.keys(listItems)
			.map((key) => listItems[key])
			.filter((item) => item);
	});
</script>

<ul class="inner">
	{#each list as item}
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
