<script>
	let { data, url } = $props();
</script>

<article
	class="group relative isolate grid overflow-clip rounded-lg border-2 border-alternate-text bg-alternate-surface no-underline hover:border-focused-window"
>
	{#if data.img}
		<figure class="mask-pixels-btm m-0!">
			<img
				src={data.img.src}
				alt={data.img.alt}
				class="m-0 aspect-video w-full origin-(--transform-origin,top_left) object-cover object-top duration-500 ease-in-out group-hover:scale-(--hover-scale,1.5) motion-safe:transition-transform"
				style:--transform-origin={data.img.transformOrigin}
				style:--hover-scale={data.img.hoverScale}
			/>
		</figure>
	{/if}
	<div class={[data.img && '-mt-16 pt-0', 'z-10 p-8']}>
		<h2 class="my-0! -ml-4 inline-block bg-alternate-surface px-4 pb-4">{data.title}</h2>
		<p>{data.excerpt}</p>
		<a href={url} class="after:absolute after:inset-0">Full Case Study</a>
	</div>
</article>
