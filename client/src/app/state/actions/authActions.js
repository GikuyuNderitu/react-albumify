import axios from 'axios';
import { SIGNING_IN, SIGNING_OUT, SIGNING_IN_SUCCESS, SIGNING_IN_ERROR } from './types';

export const register = body => {
	return dispatch => {
		axios.post('/users', body)
		.then( ({ data }) => {
			console.log("Register Event occurred and succeeded!", data);
			dispatch({type: SIGNING_IN_SUCCESS, payload: data})			
		})
		.catch( err => {
			console.error("Registration event occurred and failed :(.", err);
			dispatch({type: SIGNING_IN_ERROR, payload: err})
		})
	}
}