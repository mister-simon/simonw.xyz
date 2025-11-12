<script lang="ts">
	import type { AppBskyEmbedRecord } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	const { embed, post }: { embed: AppBskyEmbedRecord.View; post: PostView } = $props();
</script>

<div>This is a record</div>
