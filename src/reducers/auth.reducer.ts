import { createAction, createReducer } from '@reduxjs/toolkit';

export enum ActionType {
  RANDOM_FETCH = 'auth/random_fetch',
  RANDOM_FETCH_SUCCESS = 'auth/random_fetch_success',
  RANDOM_FETCH_START = 'auth/renadom_fetch_start',
}

type Auth = {
  user: {} | null;
  permissions: {} | null;
  loading: boolean;
};

export const initialState: Auth = {
  permissions: null,
  user: null,
  loading: false,
};

export const actions = {
  fetchRandomData: createAction(ActionType.RANDOM_FETCH),
  fecthRandomDataSuccess: createAction<any>(ActionType.RANDOM_FETCH_SUCCESS),
  fetchRandomDataStart: createAction(ActionType.RANDOM_FETCH_START),
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.fecthRandomDataSuccess, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(actions.fetchRandomDataStart, (state) => {
    state.loading = true;
  });
});

export default authReducer;
