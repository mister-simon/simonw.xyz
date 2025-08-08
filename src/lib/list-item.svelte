<script lang="ts">
	import type { TreeNode } from './navigation';

	let { item, useAriaCurrent = false }: { item: TreeNode; useAriaCurrent: boolean } = $props();
</script>

<li>
	<a
		href={item.url}
		class={[
			'flex items-center gap-2 p-1',
			item.active && 'active bg-alternate-surface text-alternate-text'
		]}
		aria-current={useAriaCurrent && item.active && 'page'}
	>
		{#if item.icon}
			<span class={['iconify size-[1lh]', item.icon]}></span>
		{/if}

		{item.name}
	</a>
</li>
