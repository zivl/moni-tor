/**
 * Created by Talio on 3/29/2017.
 */

import {AsyncStorage} from 'react-native';
import {registerStatuses, registerActionType} from './RegisterConstants.js';

function isDataValid(user){
    return user.id && user.phone && user.fullName;
}

const registerActions = Object.freeze({

    registerNewUser(dispatch, {userData}){
        if(isDataValid(userData)) {
			AsyncStorage.setItem('@userData:key', JSON.stringify(userData), error => {
				console.log("Could not register user. Please try again", error);
			}).then(() => dispatch({type: registerStatuses.REGISTER, userData}));
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
