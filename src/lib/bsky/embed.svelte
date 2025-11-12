<script lang="ts">
	import {
		AppBskyEmbedExternal,
		AppBskyEmbedImages,
		AppBskyEmbedRecord,
		AppBskyEmbedRecordWithMedia,
		AppBskyEmbedVideo
	} from '@atproto/api';

	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	import Video from './embeds/video.svelte';
	import External from './embeds/external.svelte';
	import Record from './embeds/record.svelte';
	import RecordWithMedia from './embeds/record-with-media.svelte';
	import Images from './embeds/images.svelte';

	const { post }: { post: PostView } = $props();
	const embed = $derived(post.embed);
</script>

{#if AppBskyEmbedImages.isView(embed)}
	<Images {embed} {post} />
{:else if AppBskyEmbedVideo.isView(embed)}
	<Video {embed} {post} />
{:else if AppBskyEmbedExternal.isView(embed)}
	<External {embed} {post} />
{:else if AppBskyEmbedRecord.isView(embed)}
	<Record {embed} {post} />
{:else if AppBskyEmbedRecordWithMedia.isView(embed)}
	<RecordWithMedia {embed} {post} />
{/if}

<!-- <div>
	<pre class="max-w-full overflow-auto break-all">{JSON.stringify(embed, null, 2)}</pre>
</div> -->
