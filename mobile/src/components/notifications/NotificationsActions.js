import NotificationsConstants from './NotificationsConstants';

export default NotificationsActions = Object.freeze({

	tokenReceived(dispatch, token) {
		console.log('token from FCM', token);
		dispatch({
			type: NotificationsConstants.TOKEN_RECEIVED,
			token
		});
	}

});    

