
import {combineReducers, createStore} from 'redux';
import MonitorAdminReducer from './components/MonitorAdminReducer.js';

export const storeCreator = (initialState) => createStore(combineReducers({
	monitorAdmin: MonitorAdminReducer
}), initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);


const store = storeCreator();

export default store;
