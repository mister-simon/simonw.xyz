<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About - Simonw.xyz</title>
</svelte:head>

<div class="grid-stack relative grid size-full">
	<div class="relative z-10 mx-8 prose shrink-0 py-8">
		<h1>Who is Simon?</h1>
		<p class="text-lg">
			<strong>Simon W</strong> has been a <strong>Web Developer</strong> since he was about 14 years
			old ~ <em>{new Date().getFullYear() - 2007} years ago</em>.
		</p>
		<p>
			Simon grew up with the early web and cares deeply about it's <strong>future</strong>. We
			should all be trying to make the internet <strong>useful</strong>,
			<strong>accessible</strong>, and <strong>inclusive</strong>... More <strong>human</strong>.
		</p>
	</div>

	<div class="grid-stack mt-auto grid">
		<div class="mask-pixels-top bg-alternate-surface/50"></div>
		<figure class="ml-auto aspect-square w-[50cqmin]">
			<picture>
				<img
					src="/assets/simon-cat-optimized.webp"
					alt="Simon sits on a sofa, coffee mug in one hand, petting a cat on his lap. He wears a black and white floral shirt, blue jeans, blue glasses, and seems to be enjoying the cat's company."
					class="clip-br size-full object-cover"
				/>
			</picture>
		</figure>
	</div>
</div>
