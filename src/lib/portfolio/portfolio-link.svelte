<script>
	let { title, detail, url } = $props();
</script>

<a href={url} class="no-underline">
	<strong>{title}</strong> - {detail}
</a>
