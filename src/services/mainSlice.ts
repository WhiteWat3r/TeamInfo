import { createSlice } from '@reduxjs/toolkit';

export interface IPerson {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IMainState {
  isAuthenticated: boolean;
  userEmail: string;
  authProcess: boolean;
  peopleLoading: boolean;
  peopleList: IPerson[];
  likeList: number[];
}

const initialState: IMainState = {
  isAuthenticated: false,
  userEmail: '',
  authProcess: false,
  peopleLoading: false,
  peopleList: [],
  likeList: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPeopleList: (state, action) => {
      state.peopleList = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userEmail = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userEmail = '';
    },
    like: (state, action) => {
      state.likeList = [...state.likeList, action.payload];
    },
    dislike: (state, action) => {
      state.likeList = state.likeList.filter((id) => id !== action.payload);
    },
    setLikeArray: (state, action) => {
      state.likeList = action.payload;
    },
  },
});

export const { setPeopleList, login, logout, dislike, like, setLikeArray } = mainSlice.actions;
