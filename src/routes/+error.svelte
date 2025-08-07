<script lang="ts">
	import { page } from '$app/state';
	import ListIndex from '$lib/list-index.svelte';
	import { getNavData } from '$lib/navigation';

	let { current } = $derived(getNavData(page.url.pathname));
</script>

{#if current.children.length}
	<ListIndex items={current.children} />
{:else}
	<div class="relative w-full overflow-clip">
		<div class="prose ml-8 py-8">
			<h2>Ah, Flippin' Heck!</h2>
			<p class="lead">Something went wrong. No doubt that's actually my fault.</p>
			<p>Does this mean anything to you?</p>
			<pre>({page.status}) {page.error?.message}</pre>
		</div>
	</div>
{/if}
