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

	static setInitialComponentState(subStateKey, initialState) {
		if (!this.state[subStateKey]) {
			this.state[subStateKey] = {};
		}
		this.mergeState(subStateKey, initialState);
		this.pushState(subStateKey);
	}

	static setState(subState) {
		const subStateKey = Object.keys(subState)[0];
		this.mergeState(subStateKey, subState[subStateKey]);
		this.pushState(subStateKey);
	}

	static mergeState(subStateKey, newState) {
		this.state[subStateKey] = deepMerge(this.state[subStateKey], newState);
	}

	static pushState(key) {
		for (const component of this.stateManager[key]) {
			const state = {
				[key]: this.state[key]
			};
			component.setState(state);
		}
	}

	static getState() {
		return this.state;
	}

}
