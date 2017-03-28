
import {combineReducers, createStore} from 'redux';
import HomeScreenReducer from './components/HomeScreenReducer';

export const storeCreator = (initialState) => createStore(combineReducers({
	home: HomeScreenReducer
}), initialState);

const store = storeCreator();

export default store;
