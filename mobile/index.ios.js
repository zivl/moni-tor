
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Application from './src/Application';
import ScreenChooser from './src/ScreenChooser';

export default class Mobile extends Component {
	render() {
		return (
            	<Application><ScreenChooser /></Application>
		);
	}
}
AppRegistry.registerComponent('mobile', () => Mobile);
