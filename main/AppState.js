import deepMerge from './deepMerge';


export default class AppState {

	static state = {};
	static stateManager = {};

	static connect(component, subStateKey, state) {
		let initialState = state;
		if (!initialState) initialState = {};
		let components;
		if (this.stateManager[subStateKey]) {
			components = [...this.stateManager[subStateKey], component];
		}
		else {
			components = [component];
		}
		const newSubState = {
			[subStateKey]: components
		};
		this.stateManager = {
			...this.stateManager,
			...newSubState
		};
		this.setInitialComponentState(subStateKey, initialState);
	}

	static disconnect(component, subStateKey) {
		if (this.stateManager[subStateKey]) {
			const newComponentList = [];
			for (let registeredComponent of this.stateManager[subStateKey]) {
				if (registeredComponent !== component) {
					newComponentList.push(registeredComponent);
				}
			}
			this.stateManager[subStateKey] = newComponentList;
		}
	}

	static setInitialComponentState(subStateKey, initialState) {
		if (!this.state[subStateKey]) {
			this.state[subStateKey] = {};
		}
		this.mergeState(subStateKey, initialState);
		this.pushState(subStateKey);
	}

	static setState(subState) {
		const subStateKeys = Object.keys(subState);
		if (subStateKeys.length > 0) {
			for (let key of subStateKeys) {
				this.mergeState(key, subState[key]);
				this.pushState(key);
			}
		}
	}

	static setSubState(subStateParent, subStatePath, subState) {
		if (typeof this.state[subStateParent] === 'object') {
			subStatePath = this.getSubStatePath(subStatePath);
			const clone = Object.assign({}, this.state[subStateParent]);
			eval('clone' + subStatePath + ' = subState');
			this.state[subStateParent] = clone;
			this.pushState(subStateParent);
		}
		else {
			throw Error('Use setState()');
		}
	}

	static mergeState(subStateKey, newState) {
		if (!this.state[subStateKey]) this.state[subStateKey] = {};

		if (typeof newState === 'object') this.state[subStateKey] = deepMerge(this.state[subStateKey], newState);
		else this.state[subStateKey] = newState;
	}

	static pushState(key) {
		if (this.stateManager[key] && this.stateManager[key].length > 0) {
			for (const component of this.stateManager[key]) {
				const state = {
					[key]: this.state[key]
				};
				component.setState(state);
			}
		}
	}

	static getState() {
		return this.state;
	}

	static getSubState(subStateParent, subStatePath) {
		const path = this.getSubStatePath(subStatePath);
		return eval('this.state[subStateParent]' + path);
	}

	static getSubStatePath(subStatePath) {
		let path = subStatePath;
		if (subStatePath === '' || !subStatePath) {
			path = '';
		}
		else if (subStatePath.charAt(0) !== '[') {
			path = '.' + subStatePath;
		}
		return path;
	}

}
