<script>
	let { title, detail, url, external } = $props();
</script>

<a
	href={url}
	target={external && '_blank'}
	rel={external && 'nofollow noopener'}
	class={external && 'external-link'}
>
	<strong>{title}</strong> - {detail}
</a>
