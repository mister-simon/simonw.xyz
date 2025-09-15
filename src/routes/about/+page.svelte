<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About - Simonw.xyz</title>
</svelte:head>

<div class="relative w-full overflow-clip">
	<div class="mx-8 prose py-8">
		<h1 id="hi">Who is Simon?</h1>
		<p class="text-lg">
			<strong>Simon W</strong> is a <strong>Web Developer</strong> and has been since he was about
			14 years old ~ About <em>{new Date().getFullYear() - 2007} years ago</em>.
		</p>
	</div>
</div>
