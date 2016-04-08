'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = deepMerge;
function deepMerge(target, src) {
	var dest = {};

	if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
		Object.keys(target).forEach(function (key) {
			dest[key] = target[key];
		});
	}
	Object.keys(src).forEach(function (key) {
		if (_typeof(src[key]) !== 'object' || !src[key]) {
			dest[key] = src[key];
		} else if (!target[key]) {
			dest[key] = src[key];
		} else {
			dest[key] = deepMerge(target[key], src[key]);
		}
	});

	return dest;
}