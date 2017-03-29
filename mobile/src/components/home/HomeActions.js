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

    reserveSeat(dispatch){
        AsyncStorage.getItem('@userData:key').then(userData => {
            debugger;
            fetch(baseUrl + '/queue', {
                method: 'post',
                headers: {
                    'Accept': contentType,
                    'Content-Type': contentType
                },
                body: userData
            })
                .then(response => {debugger;dispatch({
                    type: HomeConstants.SEAT_RESERVED,
                    hasBeenRegistered: response.ok
                })})
        });

    }

});