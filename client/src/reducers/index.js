import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
	auth: authReducer, //meaning: the 'auth' piece of state is produces by the authReducer
	form: reduxForm
});
