
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Application from './src/Application';
import HomeScreen from './src/components/HomeScreen'

export default class Mobile extends Component {
	render() {
		return (
            <Application><HomeScreen/></Application>
		);
	}
}

AppRegistry.registerComponent('mobile', () => Mobile);
