<script>
	let { data } = $props();
	const { PostContent } = $derived(data);
	const { title, excerpt, date, updated, coverImage, coverWidth, coverHeight, tags, archived } =
		$derived(data.meta);
</script>

<svelte:head>
	<title>{title ?? 'A Thought'} - Simonw.xyz</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title ?? 'A Thought'} />
	<meta name="twitter:title" content={title ?? 'A Thought'} />
	{#if excerpt}
		<meta data-key="description" name="description" content={excerpt} />
		<meta property="og:description" content={excerpt} />
		<meta name="twitter:description" content={excerpt} />
	{/if}

	{#if coverImage}
		<meta property="og:image" content={coverImage} />
		<meta property="og:image:width" content={coverWidth} />
		<meta property="og:image:height" content={coverHeight} />
		<meta name="twitter:image" content={coverImage} />
	{/if}
</svelte:head>

<div class="relative w-full overflow-clip">
	{#if coverImage}
		<figure
			class="w-full overflow-clip bg-alternate-surface text-alternate-text"
			style="aspect-ratio: {coverWidth} / {coverHeight};"
		>
			<img
				src={coverImage}
				width={coverWidth}
				height={coverHeight}
				alt=""
				class="size-full object-cover"
			/>
		</figure>
	{/if}
	<div class="mx-8">
		<div class="rounded-b-2xl bg-alternate-surface px-4 text-alternate-text">
			<p>Published: {date}</p>
			{#if updated}
				<p>Updated: {updated}</p>
			{/if}
		</div>
		<div class="blog-content prose max-w-none py-8 prose-h1:text-center prose-ol:pl-10">
			{#if archived ?? false}
				<h1>{title}</h1>
			{/if}
			<PostContent />
		</div>
	</div>
</div>
