/**
 * Created by Talio on 3/29/2017.
 */

import {registerStatuses} from './RegisterConstants.js';

const registerAction = Object.freeze({

    registerNewUser(dispatch, {userData}){

        dispatch({type: registerStatuses.REGISTER, userData})
    }
})
