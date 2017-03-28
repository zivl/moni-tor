
import {combineReducers, createStore} from 'redux';
import dummyReducer from './components/DummyReducer.js';

export const storeCreator = (initialState) => createStore(combineReducers({
	dummy: dummyReducer
}), initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);


const store = storeCreator();

export default store;
