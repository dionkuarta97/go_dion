import AsyncStorage from "@react-native-async-storage/async-storage";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk";

import {homeReducer} from "./Home/homeReducer";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    homeReducer: persistReducer(persistConfig, homeReducer),
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);