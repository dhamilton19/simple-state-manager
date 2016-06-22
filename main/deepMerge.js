export default function deepMerge(target, src) {
	
	const dest = {};

	if (target && typeof target === 'object') {
		Object.keys(target).forEach(function (key) {
			dest[key] = target[key];
		});
	}
	Object.keys(src).forEach(function (key) {
		if (typeof src[key] !== 'object' || !src[key]) {
			dest[key] = src[key];
		}
		else if (!target[key]) {
			dest[key] = src[key];
		}
		else {
			dest[key] = deepMerge(target[key], src[key]);
		}
	});

	return dest;
}
