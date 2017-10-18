import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	
	dispatch({ type: FETCH_USER, payload: res });

	// the above two lines can be refactored to one line of code: 
	// dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user') });
};
