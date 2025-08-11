<script lang="ts">
	import type { TreeNode } from './navigation';

	let { item, useAriaCurrent = false }: { item: TreeNode; useAriaCurrent: boolean } = $props();
</script>

<li class="max-h-full overflow-hidden text-ellipsis">
	<a
		href={item.url}
		class={[
			'flex items-center gap-2 p-1 contain-inline-size hover:bg-alternate-surface/50 hover:text-alternate-text',
			item.active && 'active bg-alternate-surface text-alternate-text'
		]}
		aria-current={useAriaCurrent && item.active && 'page'}
	>
		{#if item.icon}
			<span class={['iconify size-[1lh] shrink-0', item.icon]}></span>
		{/if}
		<span class="shrink">
			{item.name}
		</span>
	</a>
</li>

<style>
	.iconify {
		rotate: calc(var(--is-vertical, 0) * 90deg);
	}
</style>
