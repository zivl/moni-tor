import React, {Component} from 'react';
import RestApiUtil from '../utils/RestApiUtil.js';

class DummyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {response: ''}
	}

	handleRequest() {
		RestApiUtil.fetch('/test').then(response => this.setState({response: response.c}));
	}

	render() {
		return (
			<div>
				<h1>Dummy</h1>
				<h2>{`Response: ${this.state.response}`}</h2>
				<button onClick={() => this.handleRequest()}>rest</button>
			</div>
		);
	}

}

export default DummyComponent;