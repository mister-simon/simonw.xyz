<script lang="ts">
	import type { AppBskyEmbedExternal } from '@atproto/api';
	import type { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	const { embed, post }: { embed: AppBskyEmbedExternal.View; post: PostView } = $props();
</script>

<div>This is external</div>
