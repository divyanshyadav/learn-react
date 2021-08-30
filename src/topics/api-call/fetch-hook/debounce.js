export default function debounce(fn, timeout) {
	let timer;
	let controller;

	return function (...args) {
		if (controller) {
			controller.abort();
		}

		controller = new AbortController();
		clearTimeout(timer);

		const callback = () => {
			fn(args[0], {
				signal: controller.signal,
				...args[1]
			});
		};

		timer = setTimeout(callback, timeout);
	};
}
