import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './AppStore.js';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {baseUrl} from './config/Config'


export default class Application extends Component {

	render() {
		return (
			<Provider store={store}>
				{this.props.children}
			</Provider>
		);
	}
}


