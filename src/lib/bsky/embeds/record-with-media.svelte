<script lang="ts">
	import type { AppBskyEmbedRecordWithMedia } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	const { embed, post }: { embed: AppBskyEmbedRecordWithMedia.View; post: PostView } = $props();
</script>

<div>This is a record with media</div>
