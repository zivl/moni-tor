import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './AppStore.js';


class Application extends Component {

	render() {
		return (
			<Provider store={store}>
				{this.props.children}
			</Provider>
		);
	}
}

export default Application;

