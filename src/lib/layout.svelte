<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TreeNode } from '$lib/navigation/TreeNode';
	import { onNavigate } from '$app/navigation';
	import ListIndex from '$lib/navigation/list-index.svelte';

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
	let articleInner: HTMLDivElement | null = $state(null);

	onNavigate(({ from, to }) => {
		if (to?.url !== from?.url) articleInner?.scrollTo(0, 0);
	});
</script>

<div class="layout font-mono">
	<header>
		<p class="flex text-xl">
			<span>~/</span><span class="overflow-x-hidden text-ellipsis whitespace-nowrap" dir="rtl"
				>{current.displayListing}</span
			>
		</p>
	</header>
	<main class={[fullscreen && 'fullscreen']}>
		<nav class="menus" id="menus">
			<div class="primary" inert={fullscreen}>
				<ListIndex items={primary} />
			</div>
			<div class="secondary" inert={fullscreen}>
				<ListIndex items={secondary} useAriaCurrent={true} />
			</div>
		</nav>
		<article>
			<button
				type="button"
				onclick={() => (fullscreen = !fullscreen)}
				class="fullscreen-toggle"
				aria-controls="menus"
				aria-expanded={!fullscreen}
			>
				<span class="icon iconify pixel--angle-left"></span>
				<div class="sr-only">{fullscreen ? 'Show' : 'Hide'} Menu</div>
			</button>
			<div class="inner" bind:this={articleInner}>
				{@render children?.()}
			</div>
		</article>
	</main>
	<footer>
		<p class="text-right">&copy; Simon W</p>
	</footer>
</div>

<style>
	@property --spin-bg-rotation {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}

	@keyframes spin-bg {
		from {
			--spin-bg-rotation: 0deg;
		}
		to {
			--spin-bg-rotation: 360deg;
		}
	}

	.layout {
		display: grid;
		height: 100dvh;
		max-width: 100vw;
		min-width: 0;
		grid-template-rows: auto 1fr auto;

		--layout-transition-duration: 200ms;
		--layout-transition-timing: linear;

		animation: spin-bg infinite linear 600s;

		--color-stripe: color-mix(in oklab, var(--color-00), #000 25%);
		background: repeating-conic-gradient(
			from var(--spin-bg-rotation, 0deg) at 50% 150%,
			transparent 0 9.9deg,
			var(--color-stripe) 10.1deg 19.9deg,
			transparent 20.1deg
		);
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

		transition-duration: var(--layout-transition-duration);
		transition-timing-function: var(--layout-transition-timing);
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

	.menus {
		display: grid;
		grid-column: span 2;
		grid-template: subgrid / subgrid;
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

		background: rgb(from var(--color-00) r g b / 0.7);
		backdrop-filter: blur(1rem);

		transition-duration: var(--layout-transition-duration);
		transition-timing-function: var(--layout-transition-timing);
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
		container-type: inline-size;

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
				transition-duration: var(--layout-transition-duration);
				transition-timing-function: var(--layout-transition-timing);
				width: 1.5rem;
				height: 1.5rem;
			}
		}

		& > .inner {
			margin-inline: auto;
			width: 100%;
			height: 100%;
			overflow: auto;
			z-index: 0;

			@container (width > 1200px) {
				border-inline: solid 1px var(--outline-color);
				width: min(max(75cqi, 1200px), 1400px);
			}
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
		.menus {
			grid-column: auto;
			grid-row: span 2;
		}

		.primary,
		.secondary {
			--is-vertical: 1;
			writing-mode: sideways-rl;
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

	@media (max-aspect-ratio: 1) and (height < 900px) {
		main {
			--primary-width: 4ch;
		}
	}
	@media (max-aspect-ratio: 1) and (height < 500px) {
		main {
			--secondary-width: 3.25ch;
		}
	}
	@media (min-aspect-ratio: 1) and (width < 900px) {
		main {
			--primary-width: 4ch;
		}
	}
	@media (min-aspect-ratio: 1) and (width < 500px) {
		main {
			--secondary-width: 3.25ch;
		}
	}
</style>
