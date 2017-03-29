/**
 * Created by Talio on 3/29/2017.
 */

import {AsyncStorage} from 'react-native';
import {registerStatuses, registerActionType} from './RegisterConstants.js';
import {baseUrl} from '../../config/Config'
const contentType = 'application/json';

function isDataValid(user){
    return user.id && user.phone && user.fullName;
}

const registerActions = Object.freeze({

    async registerNewUser(dispatch, {userData}){
		
        if(isDataValid(userData)) {
        	try {
				
				await AsyncStorage.setItem('@userData:key', JSON.stringify(userData));
				fetch(baseUrl + '/queue', {
					method: 'post',
					headers: {
						'Accept': contentType,
						'Content-Type': contentType
					},
					body: JSON.stringify(userData)
				}).then(()=>{
					dispatch({type: registerStatuses.REGISTER, userData});
				})

				
			}
			catch (e){
				console.log("Could not register user. Please try again", e);
			}
		}
		else {
            console.log('not valid');
			dispatch({type: registerStatuses.REGISTER_FAILED});
        }
    },

    inputChange(dispatch, {deltaData}){
      dispatch({type: registerActionType.INPUT_CHANGE, deltaData});
    }
});

export default registerActions;
