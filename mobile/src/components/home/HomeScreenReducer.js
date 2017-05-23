
import HomeConstants from './HomeConstants';

let initialData = {
	user:{
		id: '123',
		fullName: 'דונה',
		phone: '0545454545'
	},
	hasBeenRegistered: false,
	gotPushNotification: false,
	allreadyRegistred: false
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
				allreadyRegistred: false
			}
		}

		case HomeConstants.ALLREADY_REGISTRED: {
			return {
				...state,
				allreadyRegistred: true	
			}
		}		
	}

	return state;

};