import {screens, actions} from './ScreenChooserConstants';

let initialValue = screens.SPLASH_SCREEN

export default reducer = (state = initialValue, action) => {
	switch (action.type){
		case actions.SET_SCREEN:{
			return action.screen
		}
	}
	return state;
}