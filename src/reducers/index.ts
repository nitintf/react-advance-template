import { combineReducers } from 'redux';
import authReducer, { initialState as authInitialState } from './auth.reducer';

const reducers = {
  users: authReducer,
};

export const initialState = {
  users: authInitialState,
};

const rootReducer = combineReducers<typeof initialState>(reducers);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
