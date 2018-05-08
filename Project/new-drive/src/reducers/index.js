import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import login from './login';
import drive from './drive';

export default combineReducers({
    router: routerReducer,
    login,
    drive
});