import NotificationsConstants from './NotificationsConstants';


export default (state = {}, action) => {
    switch (action.type){
		case NotificationsConstants.TOKEN_RECEIVED: {
			return {
				token: action.token
			}
		}
	}

	return state;
}