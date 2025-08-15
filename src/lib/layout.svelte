<script lang="ts">
	import type { Snippet } from 'svelte';
	import ListIndex from './list-index.svelte';
	import type { TreeNode } from './navigation';
	import { page } from '$app/state';

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

	let url = new URL(page.url);
	$effect(() => {
		const newUrl = new URL(page.url);

		if (newUrl.pathname !== url.pathname && articleInner) {
			articleInner.scrollTo(0, 0);
		}

		url = newUrl;
	});
</script>

<div class="layout font-mono">
	<header>
		<p class="flex text-xl">
			<span>~/</span><span class="overflow-x-hidden text-ellipsis whitespace-nowrap" dir="rtl"
				>{current.listing}</span
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

		transition-duration: 100ms;
		transition-timing-function: linear;
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

		transition-duration: 100ms;
		transition-timing-function: linear;
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
				transition-duration: 100ms;
				transition-timing-function: linear;
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
