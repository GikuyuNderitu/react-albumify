import { user } from '../../utils/models';
import { SIGNING_IN, SIGNING_IN_ERROR, SIGNING_IN_SUCCESS, SIGNING_OUT, SIGNING_OUT_SUCCESS, SIGNING_OUT_ERROR } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	validating: false,
	user,

}

export default (state=initialState, action={}) => {
	switch(action.type) {
		case SIGNING_IN: return {...state, validating: true };
		case SIGNING_IN_SUCCESS: return {...state, validating: false, isAuthenticated: true, user: action.payload };
		case SIGNING_OUT: return { ...state};
		default: return state;
	}
}