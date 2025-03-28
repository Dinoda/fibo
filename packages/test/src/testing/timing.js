export default (callback, repetition) => {
	return new Promise((r) => {
		const initTS = Date.now();

		for (let i = 0; i < repetition;i++) {
			const r = callback();
		}

		const endTS = Date.now();

		r(endTS - initTS);
	});
};
