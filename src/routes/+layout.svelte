<script lang="ts">
	import '../app.css';
	import '@fontsource/mononoki';
	import favicon from '$lib/assets/favicon.svg';
	import Layout from '$lib/layout.svelte';
	import { page } from '$app/state';
	import { getNavData } from '$lib/navigation/navigation';

	let { children } = $props();
	let navData = $derived(getNavData(page.url.pathname));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Layout primary={navData.primary} secondary={navData.secondary} current={navData.current}>
	{@render children?.()}
</Layout>
