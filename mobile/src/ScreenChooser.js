import React, {Component} from 'react';
import {Image, AsyncStorage, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {screens, actions} from './ScreenChooserConstants';
import HomeActions from './components/home/HomeActions';
import {asyncStorageKey} from './components/register/RegisterConstants.js';

import HomeScreen from './components/home/HomeScreen'
import RegisterView from './components/register/RegisterView';
import Notifications from './components/notifications/Notifications';
import SplashScreen from './components/splashScreen/SplashScreen';

function mapStateToProps(state) {
	return {
		screen: state.screen
	};
}

function mapActionsToProps(dispatch) {
	return {
		setScreen: screen => dispatch({type: actions.SET_SCREEN, screen}),
		setUserDetails: user => HomeActions.setUserDetails(dispatch, {user})
	};
}

class ScreenChooser extends Component {
	componentDidMount() {
		this.getUserFromStorage();
	}

	async getUserFromStorage() {
		let {setScreen, setUserDetails} = this.props;
		try {
			const user = await AsyncStorage.getItem(asyncStorageKey);
			if (user !== null) {
				setUserDetails(JSON.parse(user));
				setScreen(screens.HOME_SCREEN)
			}
			else {
				setScreen(screens.REGISTRATION);

			}
		} catch (error) {
			console.log(error);
		}
	}

	renderScreenByProps() {
		let {screen} = this.props;
		switch (screen) {
			case screens.SPLASH_SCREEN:
				return <SplashScreen />;
			case screens.HOME_SCREEN:
				return <HomeScreen />;
			case screens.REGISTRATION:
				return <RegisterView />;
			default:
				return <SplashScreen />;
		}
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<Image style={styles.bg} source={require('./resources/images/bg.jpg')}/>
				<Notifications />
				{this.renderScreenByProps()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	bg: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		resizeMode: 'stretch',
	}
});

export default connect(mapStateToProps, mapActionsToProps)(ScreenChooser);