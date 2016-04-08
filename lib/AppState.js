'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
			var subStateKey = Object.keys(subState)[0];
			this.mergeState(subStateKey, subState[subStateKey]);
			this.pushState(subStateKey);
		}
	}, {
		key: 'mergeState',
		value: function mergeState(subStateKey, newState) {
			this.state[subStateKey] = (0, _deepMerge2.default)(this.state[subStateKey], newState);
		}
	}, {
		key: 'pushState',
		value: function pushState(key) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.stateManager[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var component = _step.value;

					var state = _defineProperty({}, key, this.state[key]);
					component.setState(state);
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
		}
	}, {
		key: 'getState',
		value: function getState() {
			return this.state;
		}
	}]);

	return AppState;
}();

AppState.state = {};
AppState.stateManager = {};
exports.default = AppState;