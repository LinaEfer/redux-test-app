import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import logger from 'redux-logger';
import thunk from  'redux-thunk';
import promise from  'redux-promise-middleware';

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null,
};

/**
 * UserReducer, MessageReducer, CombineReducer
 */
const reducer = (state=initialState, action) => {
    switch (action.type){
        case "FETCH_USERS_PENDING": {
            return{...state, fetching:true};
            break;
        }
        case "FETCH_USERS_REJECTED": {
            return{...state, fetching:false, error: action.payload};
            break;
        }
        case "FETCH_USERS_FULFILLED": {
            return{...state, fetching:false, fetched:true, users: action.payload};
            break;
        }
    }
    return state;
};

/**
 * Middleware
 */
const middleware = applyMiddleware(promise(), thunk, logger());

/**
 * Store
 */
const store = createStore(reducer, middleware);

/**
 * Values
 */
store.dispatch({
    type: "FETCH_USERS",
    payload: axios.get("http://rest.learncode.academy/api/wstern/users")
});