import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	
	dispatch({ type: FETCH_USER, payload: res.data });

	// the above two lines can be refactored to one line of code: 
	// dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user') });
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => {
	return { type: 'submit_survey' };
};
