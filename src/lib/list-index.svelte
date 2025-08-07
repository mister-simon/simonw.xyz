<script lang="ts">
	import ListItem from './list-item.svelte';
	import type { TreeNode } from './navigation';

	let {
		items
	}: {
		items: Record<string, TreeNode> | undefined;
	} = $props();

	const list = $derived.by(() => {
		return Object.keys(items ?? {})
			.map((key) => [key, (items ?? {})[key]])
			.filter(([key, item]) => item);
	});
</script>

<ul class="inner">
	{#each list as [key, item]}
		<ListItem {item} {key} />
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
