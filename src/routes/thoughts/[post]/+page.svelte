<script>
	let { data } = $props();
	const { PostContent } = data;
</script>

<div class="relative w-full overflow-clip">
	<div class="mx-8 prose py-8">
		<PostContent />
	</div>
</div>
