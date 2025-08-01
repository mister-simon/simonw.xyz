<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<pre class="font-mono leading-none">{data.art}</pre>
