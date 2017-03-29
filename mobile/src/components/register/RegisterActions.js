/**
 * Created by Talio on 3/29/2017.
 */

import {registerStatuses} from './RegisterConstants.js';

const registerAction = Object.freeze({

    registerNewUser(dispatch, {userData}){
        AsyncStorage.setItem('@userData:key', userData, error => {
            console.log("Could not register user. Please try again", error);
        }).then(() => dispatch({type: registerStatuses.REGISTER, userData}));
        
    }
})
