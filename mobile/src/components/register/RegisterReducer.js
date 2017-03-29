
import {registerStatuses, registerActionType} from './RegisterConstants';

let initialValue = {
	id: '',
	phone: '',
	fullName: '',
	showModal: true,
	showError: false
};

export default reducer = (state = initialValue, action) => {
	switch (action.type){
		case registerStatuses.REGISTER:{
			return {
				...state,
				showModal: false,
				showError: false
			}
		}
		case registerStatuses.REGISTER_FAILED:{
			return {
				...state,
				showError: true
			}
		}
		case registerActionType.INPUT_CHANGE: {
			return {
				...state,
				...action.deltaData,
				showError: false,
			}
		}
	}

	return state;
}