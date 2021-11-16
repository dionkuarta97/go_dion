import AsyncStorage from "@react-native-async-storage/async-storage";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk";

import {authReducer} from "./Auth/authReducer";
import {homeReducer} from "./Home/homeReducer";
import {profileReducer} from "./Profile/profileReducer";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    authReducer: persistReducer(persistConfig, authReducer),
    homeReducer: homeReducer,
    profileReducer: profileReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
