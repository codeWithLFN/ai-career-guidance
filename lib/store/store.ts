import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Example slice
import academicReducer from "./slices/academicSlice";
import assessmentReducer from './slices/assessmentSlice';
import recommendationSlice from "./slices/recommendationSlice";


const rootReducer = combineReducers({
  academicRecords: academicReducer,
  assessment: assessmentReducer,
  recommendations: recommendationSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
