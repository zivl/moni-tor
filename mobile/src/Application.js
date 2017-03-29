import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './AppStore.js';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
 


export default class Application extends Component {

componentDidMount() {
        //FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            console.log('token from FCM', token)
            //fetch('https://admin-moni-tor.herokuapp.com//notify', {
			fetch('http://192.168.159.37:5000/notify', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',				
				},
				body: JSON.stringify({
					token: token
				})
			}).then(resp => {
				console.log('response from notify with Token')
				console.log(resp);
			}).catch(e => console.log(e));			
        });

		this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(!notif.local_notification){
              //this is a local notification
				FCM.presentLocalNotification({
					id: "UNIQ_ID_STRING",                               // (optional for instant notification)
					title: notif.title,                     // as FCM payload
					body: notif.msg,                    // as FCM payload (required)
					sound: "default",                                   // as FCM payload
					priority: "high",                                   // as FCM payload
					click_action: "ACTION",                             // as FCM payload
					badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
					number: 10,                                         // Android only
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
					my_custom_data:'my_custom_field_value',             // extra data you want to throw
					lights: true,                                       // Android only, LED blinking (default false)
					show_in_foreground: true                                  // notification when app is in foreground (local & remote)
				});
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }
           
			console.log('notify comming');
			console.log(notif);


		});	
}     

	render() {
		return (
			<Provider store={store}>
				{this.props.children}
			</Provider>
		);
	}
}


