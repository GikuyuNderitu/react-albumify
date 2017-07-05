import axios from 'axios';
import { SIGNING_IN, SIGNING_OUT, SIGNING_IN_SUCCESS, SIGNING_IN_ERROR, LOGOUT } from './types';

export const register = body => {
	return axios.post('/users', body)
}

export const login = body => {
	return axios.post('/users/login', body);
}

export const attemptAuth = _ => {
	return axios.get('/authenticate');
}

export const logout = _ => {
	return axios.get('/users/logout');
}