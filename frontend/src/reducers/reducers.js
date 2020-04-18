import {combineReducers} from 'redux';
import initialState from './initialState.js';
import {CHANGE_TAB, SET_AUTHTOKEN, PLAY_SOUNDCLIP, SET_CURRENT_GUILD, UPDATE_PAYLOAD } from './../actions.js'

export function menu(state = initialState.menu, action) {
	switch (action.type) {
		case CHANGE_TAB:
			return {...state, activeTab: action.tab};
		default:
			return state;
	}
}

export function currentInformation(state = initialState.currentInformation, action) {
	switch (action.type) {
		case SET_CURRENT_GUILD:
			return {...state, guild: action.guild};
		case SET_AUTHTOKEN:
			return {...state, authToken: action.token, authTokenExpired: action.isExpired};
		default:
			return state;
	}
}


export function backendData(state = initialState.backendData, action) {
	switch (action.type) {
		case UPDATE_PAYLOAD:
			return {...state, loaded:true, payload: action.payload};
		default:
			return state;
	}
}



const reducer = combineReducers({
	menu,
	currentInformation,
	backendData,
});

export default reducer;
