<script>
	let { data } = $props();
	const { PostContent } = $derived(data);
	const { title, excerpt, date, updated, cover, tags, archived } = $derived(data.meta);
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

	{#if cover}
		<meta property="og:image" content={cover.src} />
		<meta property="og:image:width" content={cover.width} />
		<meta property="og:image:height" content={cover.height} />
		<meta name="twitter:image" content={cover.src} />
	{/if}
</svelte:head>

<div class="relative flex min-h-full w-full flex-col overflow-clip">
	<div class="mask-pixels-btm bg-alternate-surface text-alternate-text [--mask-height:4rem]">
		{#if cover}
			<figure
				class="max-h-[50cqh] w-full overflow-clip bg-alternate-surface text-alternate-text"
				style="aspect-ratio: {cover.width} / {cover.height};"
			>
				<img
					src={cover.src}
					width={cover.width}
					height={cover.height}
					alt=""
					class="size-full object-cover object-(--position,center)"
					style:--position={cover.objectPosition}
				/>
			</figure>
		{/if}
	</div>

	<div class="mx-8 grow">
		<div
			class="blog-content prose max-w-none py-8 prose-h1:text-center prose-h1:leading-relaxed prose-ol:pl-10"
		>
			{#if archived ?? false}
				<section>
					<h1>{title}</h1>
				</section>
			{/if}
			<PostContent />
		</div>
	</div>

	<footer
		class="mask-pixels-top mt-auto
bg-alternate-surface pt-(--mask-height) [--mask-height:1rem]"
	>
		<div class="px-16 py-4">
			<p>Published: {date}</p>
			{#if updated}
				<p>Updated: {updated}</p>
			{/if}
		</div>
	</footer>
</div>
