import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import NotificationsActions from './NotificationsActions';
import HomeConstants from '../home/HomeConstants.js';

const mapStateToProps = () => {
	return {}
};

const mapActionsToProps = (dispatch) => {

	return {
		onTokenReceived: (token) => NotificationsActions.tokenRecieved(dispatch, token),
		onDeletedFromQueue: () => {
			dispatch({
				type: HomeConstants.REMOVED_FROM_QUEUE
			})
		}
	}
};

class Notifications extends Component {

	componentDidMount() {
		if (Platform.OS === 'ios') {
			FCM.requestPermissions(); // for iOS
		}
		FCM.getFCMToken().then(token => {
			console.log('token from FCM', token);
			this.props.onTokenReceived(token);
		});

		this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
			// there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@ notif @@@@@@@@@@@@@@@@@@@@@@@@@@');
			console.log(JSON.stringify(notif));
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@ notif @@@@@@@@@@@@@@@@@@@@@@@@@@');			
			if (!notif.local_notification) {
				if (notif.removedFromQueue === 'true') {
					this.props.onDeletedFromQueue();
				} else {
				//this is a local notification
					
					FCM.presentLocalNotification({
						id: "UNIQ_ID_STRING",                               // (optional for instant notification)
						title: notif.title,                     // as FCM payload
						body: notif.msg,                    // as FCM payload (required)
						sound: "default",                                   // as FCM payload
						priority: "high",                                   // as FCM payload
						click_action: "ACTION",                             // as FCM payload
						badge: 1,                                          // as FCM payload IOS only, set 0 to clear badges
						number: 1,                                         // Android only
						ticker: "My Notification Ticker",                   // Android only
						auto_cancel: true,                                  // Android only (default true)
						large_icon: "ic_launcher",                           // Android only
						icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
						big_text: "Show when notification is expanded",     // Android only
						sub_text: notif.sub_text,                      // Android only
						color: "red",                                       // Android only
						vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
						tag: 'some_tag',                                    // Android only
						group: "group",                                     // Android only
						my_custom_data: 'my_custom_field_value',             // extra data you want to throw
						lights: true,                                       // Android only, LED blinking (default false)
						show_in_foreground: true                                  // notification when app is in foreground (local & remote)
					});
				}
			}
			if (notif.opened_from_tray) {
				//app is open/resumed because user clicked banner
			}
			if (Platform.OS === 'ios') {
				//optional
				//iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
				//This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
				//notif._notificationType is available for iOS platfrom
				switch (notif._notificationType) {
					case NotificationType.Remote:
						notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
						break;
					case NotificationType.NotificationResponse:
						notif.finish();
						break;
					case NotificationType.WillPresent:
						notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
						break;
				}
			}
		});

		this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
			console.log(token);
			// fcm token may not be available on first load, catch it here
		});
	}

	/*componentWillUnmount() {
		// stop listening for events
		this.notificationListener.remove();
		this.refreshTokenListener.remove();
	}*/


	render() {
		return (
			<View style={{width:0}}>
				<Text></Text>
			</View>
		)
	}
}


export default connect(mapStateToProps, mapActionsToProps)(Notifications);