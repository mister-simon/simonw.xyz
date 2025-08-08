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
		primary: TreeNode[];
		secondary: TreeNode[];
		current: TreeNode;
		children: Snippet;
	} = $props();

	let fullscreen = $state(false);
</script>

<div class="layout font-mono">
	<header>
		<h1 class="flex text-xl">
			<span>~/</span><span class="overflow-x-hidden text-ellipsis whitespace-nowrap" dir="rtl"
				>{current.listing}</span
			>
		</h1>
	</header>
	<main class={[fullscreen && 'fullscreen']}>
		<nav class="primary" inert={fullscreen}>
			<ListIndex items={primary} />
		</nav>
		<nav class="secondary" inert={fullscreen}>
			<ListIndex items={secondary} useAriaCurrent={true} />
		</nav>
		<article>
			<button type="button" onclick={() => (fullscreen = !fullscreen)} class="fullscreen-toggle">
				<span class="icon iconify pixel--angle-left"></span>
				<div class="sr-only">{fullscreen ? 'Show' : 'Hide'} Menu</div>
			</button>
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

		&.fullscreen {
			--primary-width: 0fr;
			--secondary-width: 0fr;
			--content-width: 5fr;

			& .primary,
			& .secondary {
				overflow: hidden;
				opacity: 0.5;
			}

			.icon {
				rotate: 180deg;
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

		transition-duration: 200ms;
		transition-timing-function: ease-in-out;
		transition-property: opacity;
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

		& > .fullscreen-toggle {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			background-color: var(--color-focused-window);
			width: 1.5rem;
			height: 1.5rem;
			display: grid;
			place-content: center;
			cursor: pointer;

			& > .icon {
				transition-property: rotate, transform;
				transition-duration: 200ms;
				transition-timing-function: ease-in-out;
				width: 1.5rem;
				height: 1.5rem;
			}
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

			& > .fullscreen-toggle {
				position: absolute;
				top: 0;
				left: auto;
				right: 1rem;
				z-index: 1;
			}
		}
		.icon {
			transform: rotate(90deg);
		}
	}
</style>
