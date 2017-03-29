import HomeConstants from './HomeConstants';
const contentType = 'application/json';

const HomeActions = Object.freeze({

	fetchAvailableSeats(dispatch){

		fetch('url', {
			method: 'get',
			headers: {
				'Accept': contentType,
				'Content-Type': contentType,
			}
		})
			.then(response => response.json())
			.then(responseJson => dispatch({type: HomeConstants.SEAT_AVAILABILITY, isAvailable: responseJson.isAvailable}));
	},

	reserveSeat(dispatch){

	}

});