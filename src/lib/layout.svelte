<script lang="ts">
	import type { Snippet } from 'svelte';
	import ListIndex from './list-index.svelte';
	import type { TreeNode } from './navigation';

	let {
		primary,
		secondary,
		current,
		children
	}: {
		primary: Record<string, TreeNode> | undefined;
		secondary: Record<string, TreeNode> | undefined;
		current: TreeNode;
		children: Snippet;
	} = $props();

	let fullscreen = $state();

	// let primary = [
	// 	{ icon: 'pixel--home-solid', name: 'Home', url: '/home', active: true },
	// 	{ icon: 'pixel--sparkles-solid', name: 'My Work', url: '/my-work', active: false },
	// 	{ icon: 'pixel--book-heart-solid', name: 'Thoughts', url: '/thoughts', active: false },
	// 	{ icon: 'pixel--user-solid', name: 'Contact', url: '/contact', active: false }
	// ];
	// let secondary = [
	// 	{ icon: 'pixel--folder', name: 'Index', url: '/home/list', active: false },
	// 	{ icon: 'pixel--writing', name: 'Index', url: '/home', active: true }
	// ];
</script>

<div class="layout font-mono">
	<header>
		<h1 class="flex text-xl">
			<span>~/</span><span class="overflow-x-hidden text-ellipsis whitespace-nowrap" dir="rtl"
				>{current.listing}</span
			>
		</h1>
	</header>
	<main>
		<nav class="primary">
			<ListIndex items={primary} />
		</nav>
		<nav class="secondary">
			<ListIndex items={secondary} />
		</nav>
		<article>
			<label for="fullscreen" class="fullscreen">
				<input type="checkbox" id="fullscreen" bind:this={fullscreen} />
				{fullscreen?.checked ? 'Show' : 'Hide'} Menu
			</label>
			<div class="inner">
				{@render children?.()}
			</div>
		</article>
	</main>
	<footer>
		<p class="text-right">&copy; Simon W</p>
	</footer>
</div>

<style>
	.layout {
		display: grid;
		height: 100dvh;
		max-width: 100vw;
		min-width: 0;
		grid-template-rows: auto 1fr auto;
	}
	main {
		/* Shared vars */
		--outline-color: var(--color-unfocused-window);
		--outline-width: 4px;
		--border-radius: 12px;

		/* Layout */
		--margin: 1rem;
		--primary-width: 1.5fr;
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

		transition-duration: 200ms;
		transition-timing-function: ease-in-out;
		transition-property: grid-template-columns, grid-template-rows;

		&:has(.fullscreen [type='checkbox']:checked) {
			--primary-width: 0fr;
			--secondary-width: 0fr;
			--content-width: 5fr;

			& .primary,
			& .secondary {
				overflow: hidden;
				opacity: 0.5;
			}
		}
	}

	header,
	footer {
		color: var(--color-window-title);
		padding-inline: calc(var(--spacing) * 9);
		margin-block: calc(var(--spacing) * 1);
		max-width: 100vw;
	}

	.primary,
	.secondary,
	article {
		/* Layout */
		height: 100%;
		contain: size;
		scrollbar-color: var(--outline-color) transparent;
		overflow: clip;
		border: var(--outline-width) solid var(--outline-color);
	}

	.secondary {
		border-inline-style: none;
	}

	.primary {
		border-radius: var(--border-radius) 0 0 var(--border-radius);
	}
	article {
		border-radius: 0 var(--border-radius) var(--border-radius) 0;
	}

	article {
		--outline-color: var(--color-focused-window);
		position: relative;

		& > .fullscreen {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}

		& > .inner {
			height: 100%;
			max-width: 100%;
			overflow: auto;
			z-index: 0;
		}
	}

	@media (max-aspect-ratio: 1) {
		main {
			grid-template-columns: auto;
			grid-template-rows:
				var(--primary-width)
				var(--secondary-width)
				var(--content-width);
		}
		.primary,
		.secondary {
			writing-mode: vertical-rl;
		}

		.primary {
			border-radius: var(--border-radius) var(--border-radius) 0 0;
		}
		article {
			border-radius: 0 0 var(--border-radius) var(--border-radius);
		}
	}
</style>
