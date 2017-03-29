import React, {Component} from 'react';
import {View, Text, PushNotificationIOS, Alert} from 'react-native';

export default class Notifications extends Component {

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
		return (
			<View>
				<Text></Text>
			</View>
		)
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

	_onLocalNotification(notification) {
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