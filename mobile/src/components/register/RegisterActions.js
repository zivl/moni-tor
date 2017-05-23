/**
 * Created by Talio on 3/29/2017.
 */

import {AsyncStorage} from 'react-native';
import {registerStatuses, registerActionType, asyncStorageKey} from './RegisterConstants.js';
import HomeActions from '../home/HomeActions';
import {screens, actions as screenChooserActions} from '../../ScreenChooserConstants';
import {baseUrl, headers} from '../../config/Config'

function isDataValid(user) {
	return user.id && user.phone && user.fullName;
}

const registerActions = Object.freeze({

    async registerNewUser(dispatch, {userData}){

        if(isDataValid(userData)) {
        	try {

				await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(userData));				
				dispatch({type: registerStatuses.REGISTER, userData});
				HomeActions.setUserDetails(dispatch, {user: userData});
				dispatch({type: screenChooserActions.SET_SCREEN, screen: screens.HOME_SCREEN});
				
			}
			catch (e) {
				dispatch({type: registerStatuses.REGISTER_FAILED});
			}
		}

		else {
			dispatch({type: registerStatuses.REGISTER_FAILED});
		}
	},

	inputChange(dispatch, {deltaData}){
		dispatch({type: registerActionType.INPUT_CHANGE, deltaData});
	}
});

export default registerActions;
