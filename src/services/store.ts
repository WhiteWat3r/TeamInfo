import { combineReducers } from 'redux';
import { mainSlice } from './mainSlice';
import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from '../api/peopleApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api/authApi';

export const rootReducer = combineReducers({
  [peopleApi.reducerPath]: peopleApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  main: mainSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
