import { combineReducers, createStore } from 'redux';

import userReducer from './reducer/user.reducer';
import roomReducer from './reducer/room.reducer';

const AppReducers = combineReducers({
    userReducer,
    roomReducer
});


const rootReducer = (state, action) => {
	return AppReducers(state, action);
}

const store = createStore(rootReducer);

export default store;