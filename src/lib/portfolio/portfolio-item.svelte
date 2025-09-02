<script>
	let { data, url } = $props();
</script>

<a href={url} class="no-underline">
	<h2>{data.title}</h2>
	<p>{data.excerpt}</p>
</a>
