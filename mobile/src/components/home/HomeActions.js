import HomeConstants from './HomeConstants';
import {baseUrl, headers} from '../../config/Config'


export default HomeActions = Object.freeze({
	setUserDetails(dispatch, {user}){
		dispatch({type: HomeConstants.SET_USER, user})
	},

	fetchAvailableSeats(dispatch){

		fetch(baseUrl + '/queue/status', {
			method: 'get',
			headers: headers
		})
			.then(response => response.json())
			.then(responseJson => dispatch({
				type: HomeConstants.SEAT_AVAILABILITY,
				isAvailable: responseJson.isAvailable
			}));
	},

	async reserveSeat(dispatch, user){
		fetch(baseUrl + '/queue', {
			method: 'post',
			headers: headers,
			body: JSON.stringify(user)
		}).then(response => {
			console.log(response);
			if (response.ok) {
				dispatch({type: HomeConstants.SEAT_RESERVED, hasBeenRegistered: response.ok})
			} else {
				dispatch({type: HomeConstants.ALREADY_REGISTERED})
			}
		});
	},

	async checkQueue(dispatch, user) {
		fetch(baseUrl + '/queue/check', {
			method: 'post',
			headers: headers,
			body: JSON.stringify(user)
		}).then(response => {
			if (!response.ok) {
				dispatch({
					type: HomeConstants.ALREADY_REGISTERED
				})
			}
		});
	}

});