import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/user.reducer";

const rootReducers = combineReducers({ user: userReducer });

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default  store;