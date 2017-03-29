import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, View, Text, StyleSheet, Button, PushNotificationIOS, Alert} from 'react-native';
import RegisterModelView from '../register/RegisterModalView';
import HomeActions from './HomeActions';

const mapStateToProps = ({home}) => {

    return {
        user: home.user,
        isSeatAvailable: home.isSeatAvailable,
        hasRegisteredBefore: home.hasBeenRegistered
    }
};

const mapActionsToProps = (dispatch) => {

    return {
        onSeatReservation: () => HomeActions.reserveSeat(dispatch)
    }
};

class HomeScreen extends Component {

	componentWillReceiveProps() {
		Alert.alert('componentWillReceiveProps');
	}

	componentWillUpdate(){
		Alert.alert('componentWillUpdate');
	}

	componentWillMount() {
		PushNotificationIOS.addEventListener('register', this._onRegistered);
		PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
		PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
		PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
		PushNotificationIOS.requestPermissions();
	}

	componentWillUnmount() {
		PushNotificationIOS.removeEventListener('register', this._onRegistered);
		PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
		PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
		PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
	}

	render() {
		let {user: {fullName}, isSeatAvailable, hasRegisteredBefore, onSeatReservation} = this.props;
		let availability = isSeatAvailable ? 'יש' : 'אין';
		let registerButtonColor = hasRegisteredBefore ? registeredBeforeButtonColor : notRegisteredBeforeButtonColor;
		return (
			<View style={styles.container}>
				<Image style={styles.bg} source={require('../register/bg.jpg')} />
				<RegisterModelView show={true}/>
				<View>
					<Text>{`היי ${fullName}`}</Text>
					<Text>{`כרגע ${availability} מקומות פנויים`}</Text>
				</View>
				<View>
					<Button
						onPress={() => onSeatReservation()}
						title='שרייני מקום'
						color={registerButtonColor}/>
				</View>
			</View>
		);
	}

	_onRegistered(deviceToken) {
		Alert.alert(
			'Registered For Remote Push',
			`Device Token: ${deviceToken}`,//TODO: take this and send to server
			[{
				text: 'Dismiss',
				onPress: null,
			}]
		);
	}

	_onRegistrationError(error) {
		Alert.alert(
			'Failed To Register For Remote Push',
			`Error (${error.code}): ${error.message}`,
			[{
				text: 'Dismiss',
				onPress: null,
			}]
		);
	}

	_onRemoteNotification(notification) {
		Alert.alert(
			'Push Notification Received',
			'Alert message: ' + notification.getMessage(),
			[{
				text: 'Dismiss',
				onPress: null,
			}]
		);
	}

	_onLocalNotification(notification){
		Alert.alert(
			'Local Notification Received',
			'Alert message: ' + notification.getMessage(),
			[{
				text: 'Dismiss',
				onPress: null,
			}]
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
	bg: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		resizeMode: 'stretch',
	}
});

const notRegisteredBeforeButtonColor = 'crimson';
const registeredBeforeButtonColor = 'darkcyan';

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);