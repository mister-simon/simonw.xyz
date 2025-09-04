<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Home - Simonw.xyz</title>
</svelte:head>

<div class="relative w-full overflow-clip">
	<div class="mx-8 prose py-8">
		<h1 id="hi">Some inner content</h1>
		<p class="lead">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda dignissimos, ratione
			non voluptas et deleniti quisquam suscipit porro dolorum, sed, consequatur quam neque deserunt
			repellat maiores quidem? <a href="#hi">Consectetur, vitae?</a>
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam cumque ipsum saepe
			alias illum assumenda facilis ipsa libero cupiditate mollitia, nulla fugiat pariatur quo
			blanditiis ipsam, adipisci, aliquam dolores.
		</p>
		<ul><li>asdoijasfoijsaf</li></ul>

		<p>I made this little ascii art of the thing I've been using as a logo for... A while now:</p>
		<pre
			class="not-prose my-4 inline-block overflow-clip rounded-full font-mono leading-[1.250] tracking-normal [--font-width:110.3]"
			aria-hidden="true">{data.art}</pre>
		<table>
			<thead>
				<tr><th>Hello</th><th>Hi</th></tr>
			</thead>
			<tbody>
				<tr><td>Yes</td><td>Nice</td></tr>
				<tr><td>Yes</td><td>Nice</td></tr>
				<tr><td>Yes</td><td>Nice</td></tr>
				<tr><td>Yes</td><td>Nice</td></tr>
				<tr><td>Yes</td><td>Nice</td></tr>
				<tr><td>Yes</td><td>Nice</td></tr>
			</tbody>
		</table>

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam cumque ipsum saepe
			alias illum assumenda facilis ipsa libero cupiditate mollitia, nulla fugiat pariatur quo
			blanditiis ipsam, adipisci, aliquam dolores.
		</p>
	</div>
</div>
