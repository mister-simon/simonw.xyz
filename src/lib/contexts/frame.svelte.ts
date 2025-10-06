import { setContext, getContext, hasContext } from 'svelte';

const KEY = Symbol('frame');

class FrameContext {
	#val: String | null = $state(null);

	get val() {
		return this.#val;
	}

	set val(val: String | null) {
		this.#val = val;
	}

	get isGear() {
		return this.#val === 'gear';
	}
}

export default function getFrameContext(): FrameContext {
	if (hasContext(KEY)) {
		return getContext(KEY);
	}

	const context = new FrameContext();
	setContext(KEY, context);
	return context;
}
