import { applyMiddleware, combineReducers, createStore } from "redux";

/**
 * UserReducer, MessageReducer, CombineReducer
 */
const userReducer = (state={}, actions) => {
    switch (actions.type){
        case "CHANGE_NAME": {
          state = { ...state, name: actions.payload };
          break;
        }
        case "CHANGE_AGE": {
            state = { ...state, age: actions.payload };
            break;
        }
    }
    return state;
};

const messagesReducer = (state=[], actions) => {
    return state;
};

const reducers = combineReducers( {
    user: userReducer,
    messages: messagesReducer,
});

/**
 * Middleware
 */
const logger = (store) => (next) => (action) => {
    console.log("action fired", action);
    next(action);
};

const middleware = applyMiddleware(logger);

/**
 * Store
 */
const store = createStore(reducers, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

/**
 * Values
 */
store.dispatch({type: "CHANGE_NAME", payload: "Lilly"});
store.dispatch({type: "CHANGE_AGE", payload: "10"});
store.dispatch({type: "CHANGE_AGE", payload: "11"});