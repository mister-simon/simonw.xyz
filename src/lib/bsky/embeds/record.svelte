<script lang="ts">
	import type { AppBskyEmbedRecord } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	const { embed, post }: { embed: AppBskyEmbedRecord.View; post: PostView } = $props();
</script>

<!-- <div class="mx-4 mb-4 grid gap-0.5 overflow-clip rounded-lg border-2 border-popup-urgent-border">
	Record without media
</div> -->
