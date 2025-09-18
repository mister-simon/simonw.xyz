<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About - Simonw.xyz</title>
</svelte:head>

<div class="relative w-full overflow-clip">
	<div class="mx-8 prose py-8">
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
		<p>
			Take a look around, find out what he's been up to. Hopefully you'll find something of value.
		</p>
	</div>
</div>
