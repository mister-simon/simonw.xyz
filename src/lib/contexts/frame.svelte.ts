import { createContext } from 'svelte';

class FrameContext {
	#value: String | null = $state(null);

	get value() {
		return this.#value;
	}

	set value(value: String | null) {
		this.#value = value;
	}

	get isGear() {
		return this.#value === 'gear';
	}

	match(path: null|undefined|string) {
		if (path === '/about/gear.svx') {
			this.value = 'gear';
		}
	}
}

export const [getFrameContext, setFrameContext] = createContext<FrameContext>();

export function createFrameContext() {
	return setFrameContext(new FrameContext());
}