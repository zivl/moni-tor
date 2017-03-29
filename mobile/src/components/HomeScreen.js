import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RegisterModelView from './register/RegisterModalView';
import {AsyncStorage} from 'react-native';

export default class HomeScreen extends Component {

	static propTypes = {};

	static defaultProps = {};

	state = {
		isRegistered: null
	};

	componentDidMount() {
		this.checkIfRegistered();
	}

	checkIfRegistered() {
		AsyncStorage.getItem('@userData:key', (error, result) => {
			if(error) {
				console.log("Could not get registered user. Please try again", error);
			}
			this.setState({isRegistered: Boolean(result)});
		});
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.isRegistered != null &&
					(!this.state.isRegistered ? <RegisterModelView /> : <Text>REGISTERED!!!</Text>)}
				{/*<Text>we are here</Text>*/}
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