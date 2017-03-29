import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import RegisterModelView from './RegisterModalView';

export default class HomeScreen extends Component {

	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<View style={styles.container}>
				{/*<RegisterModelView />*/}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	}
});