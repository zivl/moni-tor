
import {combineReducers, createStore} from 'redux';
import HomeScreenReducer from './components/home/HomeScreenReducer';
import registerReducer from './components/register/RegisterReducer';
import NotificationsReducer from './components/notifications/NotificationsReducer';
import ScreenChooserReducer from './ScreenChooserReducer';

export const storeCreator = (initialState) => createStore(combineReducers({
	home: HomeScreenReducer,
	register: registerReducer,
	notifications: NotificationsReducer,
	screen: ScreenChooserReducer
}), initialState);

const store = storeCreator();

export default store;
