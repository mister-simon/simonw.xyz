<script lang="ts">
	import { page } from '$app/state';
	import ListIndex from '$lib/list-index.svelte';
	import { getNavData, sortMenu } from '$lib/navigation';

	let { current } = $derived(getNavData(page.url.pathname));
	let children = $derived.by(() => {
		return sortMenu(Object.values(current.children));
	});
</script>

{#if children.length}
	<div class="mx-8">
		<ListIndex items={children} />
	</div>
{:else}
	<div class="relative w-full overflow-clip">
		<div class="mx-8 prose py-8">
			<h2>Ah, Flippin' Heck!</h2>
			<p class="lead">Something went wrong. No doubt that's actually my fault.</p>
			<p>Does this mean anything to you?</p>
			<pre>({page.status}) {page.error?.message}</pre>
		</div>
	</div>
{/if}
