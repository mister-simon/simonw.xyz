<script lang="ts">
	import Layout from '$lib/layout.svelte';

	let { data } = $props();
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
