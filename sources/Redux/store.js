import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import { authReducer } from "./Auth/authReducer";
import { cartReducer } from "./Cart/cartReducer";
import { dataReducer } from "./Data/dataReducer";
import { homeReducer } from "./Home/homeReducer";
import { paymentReducer } from "./Payment/paymentReducer";
import { produkReducer } from "./Produk/produkReducer";
import { profileReducer } from "./Profile/profileReducer";
import { materiReducer } from "./Materi/materiReducer";
import { versionReducer } from "./Version/versionReducer";
import { soalReducer } from "./Soal/soalReducer";
import { scoreReducer } from "./Score/scoreReducer";
import { initReducer } from "./Init/initReducer";
import tryoutReducer from "./Tryout/tryoutReducer";
import { laporanReducer } from "./Laporan/laporanReducer";
import leaderboardReducer from "./Leaderboard/leaderboardReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["updatePassword"],
};

const rootReducer = combineReducers({
  initReducer: persistReducer(persistConfig, initReducer),
  authReducer: persistReducer(persistConfig, authReducer),
  soalReducer: persistReducer(persistConfig, soalReducer),
  dataReducer: dataReducer,
  homeReducer: homeReducer,
  profileReducer: profileReducer,
  produkReducer: produkReducer,
  cartReducer: cartReducer,
  paymentReducer: paymentReducer,
  materiReducer: materiReducer,
  scoreReducer: scoreReducer,
  versionReducer: versionReducer,
  tryoutReducer: tryoutReducer,
  laporanReducer: laporanReducer,
  leaderboardReducer: leaderboardReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
