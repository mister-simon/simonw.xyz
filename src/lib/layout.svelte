<div class="layout font-mono">
	<header>
		<h1 class="text-xl">~/Home/Index</h1>
	</header>
	<main>
		<nav class="primary">
			<ul class="inner">
				<li>
					<a href="#hi" class="flex items-center gap-2 bg-alternate-surface p-1 text-alternate-text"
						><span class="iconify size-[1lh] pixel--home-solid"></span> Home</a
					>
				</li>
				<li>
					<a href="#hi" class="flex items-center gap-2 p-1"
						><span class="iconify size-[1lh] pixel--sparkles-solid"></span> My Work</a
					>
				</li>
				<li>
					<a href="#hi" class="flex items-center gap-2 p-1"
						><span class="iconify size-[1lh] pixel--book-heart-solid"></span> Thoughts</a
					>
				</li>
				<li>
					<a href="#hi" class="flex items-center gap-2 p-1"
						><span class="iconify size-[1lh] pixel--user-solid"></span> Contact</a
					>
				</li>
			</ul>
		</nav>
		<nav class="secondary">
			<ul class="inner">
				<li>
					<a href="#hi" class="flex items-center gap-2 bg-alternate-surface p-1 text-alternate-text"
						><span class="iconify size-[1lh] pixel--writing"></span> Index</a
					>
				</li>
			</ul>
		</nav>
		<article>
			<div class="inner">
				<div class="mx-auto my-8 prose">
					<h2>Some inner content</h2>
					<p class="lead">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda dignissimos,
						ratione non voluptas et deleniti quisquam suscipit porro dolorum, sed, consequatur quam
						neque deserunt repellat maiores quidem? <a href="#hi">Consectetur, vitae?</a>
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam cumque ipsum
						saepe alias illum assumenda facilis ipsa libero cupiditate mollitia, nulla fugiat
						pariatur quo blanditiis ipsam, adipisci, aliquam dolores.
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
						saepe alias illum assumenda facilis ipsa libero cupiditate mollitia, nulla fugiat
						pariatur quo blanditiis ipsam, adipisci, aliquam dolores.
					</p>
				</div>
			</div>
		</article>
	</main>
	<footer>
		<p class="text-right">&copy; Simon W</p>
	</footer>
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
		--margin: 1rem;
		--primary-width: 1fr;
		--secondary-width: 2fr;
		--content-width: 5fr;

		display: grid;
		grid-template-columns:
			var(--primary-width)
			var(--secondary-width)
			var(--content-width);
		height: 100%;
		width: calc(100% - var(--margin) * 2);
		margin-inline: auto;
	}

	header,
	footer {
		color: var(--color-window-title);
		padding-inline: calc(var(--spacing) * 9);
		margin-block: calc(var(--spacing) * 1);
	}

	.primary,
	.secondary,
	article {
		--outline-color: var(--color-unfocused-window);
		--outline-width: 4px;
		--border-radius: 12px;

		/* Layout */
		height: 100%;
		contain: size;

		/* Styles */
		padding: calc(var(--outline-width) * 0.5);

		/* Scrollbar */
		scrollbar-color: var(--outline-color) transparent;

		/* Outline */
		position: relative;

		&::before {
			content: '';
			position: absolute;
			inset: calc(var(--outline-width) * -0.5);
			border: var(--outline-width) solid var(--outline-color);
		}

		& > .inner {
			position: relative;
			max-height: 100%;
			overflow: auto;
		}
	}

	.primary::before {
		border-radius: var(--border-radius) 0 0 var(--border-radius);
	}
	article::before {
		border-radius: 0 var(--border-radius) var(--border-radius) 0;
	}
	.primary .inner {
		border-radius: calc(var(--border-radius) - var(--outline-width)) 0 0
			calc(var(--border-radius) - var(--outline-width));
	}
	article .inner {
		border-radius: 0 calc(var(--border-radius) - var(--outline-width))
			calc(var(--border-radius) - var(--outline-width)) 0;
	}
	.secondary {
		--outline-color: var(--color-focused-window);
		z-index: 1;
	}
</style>
