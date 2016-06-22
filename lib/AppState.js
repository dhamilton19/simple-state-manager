'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepMerge = require('./deepMerge');

var _deepMerge2 = _interopRequireDefault(_deepMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppState = function () {
	function AppState() {
		_classCallCheck(this, AppState);
	}

	_createClass(AppState, null, [{
		key: 'connect',
		value: function connect(component, subStateKey, state) {
			var initialState = state;
			if (!initialState) initialState = {};
			var components = void 0;
			if (this.stateManager[subStateKey]) {
				components = [].concat(_toConsumableArray(this.stateManager[subStateKey]), [component]);
			} else {
				components = [component];
			}
			var newSubState = _defineProperty({}, subStateKey, components);
			this.stateManager = _extends({}, this.stateManager, newSubState);
			this.setInitialComponentState(subStateKey, initialState);
		}
	}, {
		key: 'disconnect',
		value: function disconnect(component, subStateKey) {
			if (this.stateManager[subStateKey]) {
				var newComponentList = [];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.stateManager[subStateKey][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var registeredComponent = _step.value;

						if (registeredComponent !== component) {
							newComponentList.push(registeredComponent);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				this.stateManager[subStateKey] = newComponentList;
			}
		}
	}, {
		key: 'setInitialComponentState',
		value: function setInitialComponentState(subStateKey, initialState) {
			if (!this.state[subStateKey]) {
				this.state[subStateKey] = {};
			}
			this.mergeState(subStateKey, initialState);
			this.pushState(subStateKey);
		}
	}, {
		key: 'setState',
		value: function setState(subState) {
			var subStateKeys = Object.keys(subState);
			if (subStateKeys.length > 0) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = subStateKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var key = _step2.value;

						this.mergeState(key, subState[key]);
						this.pushState(key);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}
	}, {
		key: 'setSubState',
		value: function setSubState(subStateParent, subStatePath, subState) {
			if (_typeof(this.state[subStateParent]) === 'object') {
				subStatePath = this.getSubStatePath(subStatePath);
				var clone = Object.assign({}, this.state[subStateParent]);
				eval('clone' + subStatePath + ' = subState');
				this.state[subStateParent] = clone;
				this.pushState(subStateParent);
			} else {
				throw Error('Use setState()');
			}
		}
	}, {
		key: 'mergeState',
		value: function mergeState(subStateKey, newState) {
			if (!this.state[subStateKey]) this.state[subStateKey] = {};

			if ((typeof newState === 'undefined' ? 'undefined' : _typeof(newState)) === 'object') this.state[subStateKey] = (0, _deepMerge2.default)(this.state[subStateKey], newState);else this.state[subStateKey] = newState;
		}
	}, {
		key: 'pushState',
		value: function pushState(key) {
			if (this.stateManager[key] && this.stateManager[key].length > 0) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.stateManager[key][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var component = _step3.value;

						var state = _defineProperty({}, key, this.state[key]);
						component.setState(state);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}
	}, {
		key: 'getState',
		value: function getState() {
			return this.state;
		}
	}, {
		key: 'getSubState',
		value: function getSubState(subStateParent, subStatePath) {
			var path = this.getSubStatePath(subStatePath);
			return eval('this.state[subStateParent]' + path);
		}
	}, {
		key: 'getSubStatePath',
		value: function getSubStatePath(subStatePath) {
			var path = subStatePath;
			if (subStatePath === '' || !subStatePath) {
				path = '';
			} else if (subStatePath.charAt(0) !== '[') {
				path = '.' + subStatePath;
			}
			return path;
		}
	}]);

	return AppState;
}();

AppState.state = {};
AppState.stateManager = {};
exports.default = AppState;