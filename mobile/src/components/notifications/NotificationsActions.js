import NotificationsConstants from './NotificationsConstants';

export default NotificationsActions = Object.freeze({ 

    tokenRecieved(dispatch, token) {
            dispatch({
                type: NotificationsConstants.TOKEN_RECEIVED,
                token
            });
    }

});    

