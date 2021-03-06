// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from "../reducer/index"
// import thunkMiddleware from 'redux-thunk';

// // const compose = window._REDUX_DEVTOOLS_EXTENSION_ || compose;

// export const store = createStore(
//     rootReducer,
//     window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(),
//     applyMiddleware(thunkMiddleware));

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);