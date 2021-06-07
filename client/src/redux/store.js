import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import userReducer from "./reducers/user.reducer";
import profileReducer from "./reducers/profile.reducer";
import featureReducer from "./reducers/feature.reducer";

const userPersistConfig = {
  key: "user",
  storage,
  // blacklist: ["signup", "token", "confirm", "signin", "auth", "forgot", "resend"],
  whitelist: [],
};

const profilePersistConfig = {
  key: "profile",
  storage,
  // blacklist: ["set", "author", "repo", "select"],
  whitelist: [],
}

const featurePersistConfig = {
  key: "feature",
  storage,
  // blacklist: ["addTag"],
  whitelist: [],
}

const rootReducers = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  feature: persistReducer(featurePersistConfig, featureReducer),
});

const persistConfig = {
  key: "root",
  storage: storage,
  // blacklist: ["user", "profile", "feature"],
  whitelist: [],
};

const pReducer = persistReducer(persistConfig, rootReducers);

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
