<script lang="ts">
	import { RichText, AtpAgent } from '@atproto/api';
	const { text }: { text: string } = $props();

	const agent = new AtpAgent({ service: 'https://api.bsky.app' });
	const texts = $derived(text.split('\n\n').map((paragraph) => new RichText({ text: paragraph })));
</script>

{#each texts as text}
	<p>
		{#await text.detectFacets(agent)}
			{text.text}
		{:then}
			{#each text.segments() as segment}
				{#if segment.isLink()}
					<a href={segment.link?.uri} target="_blank" rel="noopener noreferrer">{segment.text}</a>
				{:else if segment.isMention()}
					<a
						href={`https://bsky.app/profile/${segment.mention?.did}`}
						target="_blank"
						rel="noopener noreferrer">{segment.text}</a
					>
				{:else if segment.isTag()}
					<a
						href={`https://bsky.app/hashtag/${segment.tag?.tag}?author=simonw.xyz`}
						target="_blank"
						rel="noopener noreferrer">{segment.text}</a
					>
				{:else if segment.text.trim() === ''}
					{segment.text}
				{:else}
					{segment.text}
				{/if}
			{/each}
		{/await}
	</p>
{/each}
