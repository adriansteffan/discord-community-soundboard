import {combineReducers} from 'redux';
import initialState from './initialState.js';


export function menu(state = initialState.menu, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function authInformation(state = initialState.authInformation, action) {
	switch (action.type) {
		case "SET_AUTHTOKEN":
			return {...state, token: action.token};
		default:
			return state;
	}
}


const reducer = combineReducers({
	menu,
	authInformation,
});

export default reducer;
