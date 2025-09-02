<script lang="ts">
	import type { TreeNode } from '$lib/navigation/TreeNode';

	let { item, useAriaCurrent = false }: { item: TreeNode; useAriaCurrent: boolean } = $props();

	let li: HTMLLIElement | null = $state(null);

	$effect(() => {
		if (item.active) {
			li?.scrollIntoView();
		}
	});
</script>

<li class="max-h-full overflow-hidden text-ellipsis" bind:this={li}>
	<a
		href={item.url}
		class={[
			'flex items-center gap-2 p-1 contain-inline-size hover:bg-alternate-surface/50 hover:text-alternate-text',
			item.active && 'active bg-alternate-surface text-alternate-text'
		]}
		aria-current={useAriaCurrent && item.active && 'page'}
	>
		{#if item.icon}
			<span class={['iconify size-[1lh] shrink-0 self-start', item.icon]}></span>
		{/if}
		<span class="name shrink">
			{item.displayName}
		</span>
	</a>
</li>

<style>
	@container (inline-size <= 13ch) {
		.name {
			@apply sr-only;
		}
	}

	.iconify {
		rotate: calc(var(--is-vertical, 0) * 90deg);
	}
</style>
