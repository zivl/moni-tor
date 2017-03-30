
import {combineReducers, createStore} from 'redux';
import HomeScreenReducer from './components/home/HomeScreenReducer';
import registerReducer from './components/register/RegisterReducer';
import NotificationsReducer from './components/notifications/NotificationsReducer';

export const storeCreator = (initialState) => createStore(combineReducers({
	home: HomeScreenReducer,
	register: registerReducer,
	notifications: NotificationsReducer
}), initialState);

const store = storeCreator();

export default store;
