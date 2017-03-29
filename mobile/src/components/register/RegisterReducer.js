
import {registerStatuses} from './RegisterConstants';

export default reducer = (state = {}, action) => {
	switch (action.type){
		case registerStatuses.REGISTER:{
			return {
				...state,
				showModal: false,
			}
		}
	}
}