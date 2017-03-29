
import HomeConstants from './HomeConstants';

let initialData = {
	user:{
		id: '123',
		fullName: 'דונה',
		phone: '0545454545'
	},
	hasBeenRegistered: false,
	gotPushNotification: false
};

export default (state = initialData, action) => {

	switch (action.type){
		case HomeConstants.SEAT_AVAILABILITY: {
			return {
				...state,
				isSeatAvailable: action.isAvailable,
			}
		}
		case HomeConstants.SEAT_RESERVED: {
			return {
				...state,
				hasBeenRegistered: action.hasBeenRegistered
			}
		}
	}

	return state;

};