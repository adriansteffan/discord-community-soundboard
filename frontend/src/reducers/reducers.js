import {combineReducers} from 'redux';
import initialState from './initialState.js';


export function menu(state = initialState.menu, action) {
	switch (action.type) {
		default:
			return state;
	}
}


const reducer = combineReducers({
	menu,
});

export default reducer;
