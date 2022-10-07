import { createAction, createReducer } from '@reduxjs/toolkit';

export enum ActionType {
  RANDOM_FETCH = 'auth/random_fetch',
  RANDOM_FETCH_SUCCESS = 'auth/random_fetch_success',
}

type Auth = {
  user: {} | null;
  permissions: {} | null;
};

export const initialState: Auth = {
  permissions: null,
  user: null,
};

export const actions = {
  fetchRandomData: createAction(ActionType.RANDOM_FETCH),
  fecthRandomDataSuccess: createAction<any>(ActionType.RANDOM_FETCH_SUCCESS),
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.fecthRandomDataSuccess, (state, action) => {
    state.user = action.payload;
  });
});

export default authReducer;
