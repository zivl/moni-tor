
import {combineReducers, createStore} from 'redux';
import HomeScreenReducer from './components/home/HomeScreenReducer';
import registerReducer from './components/register/RegisterReducer';

export const storeCreator = (initialState) => createStore(combineReducers({
	home: HomeScreenReducer,
	register: registerReducer
}), initialState);

const store = storeCreator();

export default store;
