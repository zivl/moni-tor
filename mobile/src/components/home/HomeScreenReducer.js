
import HomeConstants from './HomeConstants';
let dummyData = {
	user:{
		id: '123',
		fullName: 'דונה',
		phone: '0545454545'
	},
	hasBeenRegistered: false,
	gotPushNotification: false
};

export default (state = dummyData, action) => {

	switch (action.type){
		case HomeConstants.SEAT_AVAILABILITY: {
			return {
				...state,
				isSeatAvailable: action.isAvailable
			}
		}
	}

	return state;

};