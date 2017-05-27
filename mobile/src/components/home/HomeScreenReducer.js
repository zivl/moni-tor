
import HomeConstants from './HomeConstants';

let initialData = {
	user:{
		id: '123',
		fullName: 'דונה',
		phone: '0545454545'
	},
	hasBeenRegistered: false,
	gotPushNotification: false,
	alreadyRegistered: false
};

export default (state = initialData, action) => {

	switch (action.type){
		case HomeConstants.SEAT_AVAILABILITY: {
			return {
				...state,
				isSeatAvailable: action.isAvailable,
			}
		}
		case HomeConstants.SET_USER: {
			return {
				...state,
				user: action.user
			}
		}
		case HomeConstants.SEAT_RESERVED: {
			return {
				...state,
				hasBeenRegistered: action.hasBeenRegistered
			}
		}

		case HomeConstants.REMOVED_FROM_QUEUE: {
			return {
				...state,
				hasBeenRegistered: false,
				alreadyRegistered: false
			}
		}

		case HomeConstants.ALREADY_REGISTERED: {
			return {
				...state,
				alreadyRegistered: true
			}
		}		
	}

	return state;

};