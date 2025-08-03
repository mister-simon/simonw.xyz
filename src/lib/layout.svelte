<div class="layout font-mono">
	<header>
		<h1 class="text-xl">~/Home/Index</h1>
	</header>
	<main>
		<nav class="primary">
			<ul>
				<li>
					<a href="#hi" class="flex items-center gap-2"
						><span class="iconify size-[1lh] pixel--home-solid"></span> Home</a
					>
				</li>
				<li>
					<a href="#hi" class="flex items-center gap-2"
						><span class="iconify size-[1lh] pixel--sparkles-solid"></span> My Work</a
					>
				</li>
				<li>
					<a href="#hi" class="flex items-center gap-2"
						><span class="iconify size-[1lh] pixel--book-heart-solid"></span> Thoughts</a
					>
				</li>
				<li>
					<a href="#hi" class="flex items-center gap-2"
						><span class="iconify size-[1lh] pixel--user-solid"></span> Contact</a
					>
				</li>
			</ul>
		</nav>
		<nav class="secondary">
			<ul>
				<li>
					<a href="#hi" class="flex items-center gap-2"
						><span class="iconify size-[1lh] pixel--writing"></span> Index</a
					>
				</li>
			</ul>
		</nav>
		<article>
			<div class="prose">
				<h2>Some inner content</h2>
				<p class="lead">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda dignissimos,
					ratione non voluptas et deleniti quisquam suscipit porro dolorum, sed, consequatur quam
					neque deserunt repellat maiores quidem? <a href="#hi">Consectetur, vitae?</a>
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam cumque ipsum
					saepe alias illum assumenda facilis ipsa libero cupiditate mollitia, nulla fugiat pariatur
					quo blanditiis ipsam, adipisci, aliquam dolores.
				</p>
				<ul><li>asdoijasfoijsaf</li></ul>
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam cumque ipsum
					saepe alias illum assumenda facilis ipsa libero cupiditate mollitia, nulla fugiat pariatur
					quo blanditiis ipsam, adipisci, aliquam dolores.
				</p>
			</div>
		</article>
	</main>
	<footer>&copy; Simon W</footer>
</div>

<style>
	.layout {
		--space: calc(var(--spacing) * 4);
		display: grid;
		height: 100dvh;
		grid-template-rows: auto 1fr auto;
	}
	main {
		/* Layout */
		--primary-width: 1fr;
		--secondary-width: 2fr;
		--content-width: 5fr;

		display: grid;
		grid-template-columns: var(--primary-width) var(--secondary-width) var(--content-width);
		height: 100%;
	}

	header {
		color: var(--color-window-title);
		padding: calc(var(--spacing) * 4);
		margin: calc(var(--spacing) * 4);
	}

	.primary,
	.secondary,
	article {
		max-height: 100%;
		overflow: auto;
		contain: size;

		/* Style */
		/* box-shadow: 8px 0 0 var(--color-unfocused-window); */
		outline: 8px solid var(--color-unfocused-window);
		padding: calc(var(--spacing) * 4);
		/* margin: 0px; */
	}
</style>
