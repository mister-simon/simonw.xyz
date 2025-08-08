import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    if (!params.post.endsWith('.svx')) {
        error(404, "There are no thoughts here...");
    }

    try {
        const post = await import(`$lib/posts/${params.post.replace(/\.svx$/, '')}.svx`)

        return {
            PostContent: post.default,
            meta: { ...post.metadata, slug: params.post }
        }
    } catch (err) {
        error(404, "Thought not found");
    }
}