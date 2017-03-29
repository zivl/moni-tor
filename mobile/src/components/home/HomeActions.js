import {AsyncStorage} from 'react-native';
import HomeConstants from './HomeConstants';
import {baseUrl} from '../../config/Config'
const contentType = 'application/json';

export default HomeActions = Object.freeze({

	fetchAvailableSeats(dispatch){

		fetch(baseUrl + '/queue/status', {
			method: 'get',
			headers: {
				'Accept': contentType,
				'Content-Type': contentType
			}
		})
			.then(response => response.json())
			.then(responseJson => dispatch({
				type: HomeConstants.SEAT_AVAILABILITY,
				isAvailable: responseJson.isAvailable
			}));
	},

	async reserveSeat(dispatch){
		try {
			const value = await AsyncStorage.getItem('@userData:key');
			if (value !== null) {
				fetch(baseUrl + '/queue', {
					method: 'post',
					headers: {
						'Accept': contentType,
						'Content-Type': contentType
					},
					body: value
				}).then(response => dispatch({type: HomeConstants.SEAT_RESERVED, hasBeenRegistered: response.ok}));
			}
		} catch (error) {
			console.log('could not receive data', error);
		}
	}

});