import { combineReducers, StateFromReducersMapObject } from 'redux';
import authReducer, { initialState as authInitialState } from './auth.reducer';

const reducers = {
  users: authReducer,
};

export const initialState = {
  users: authInitialState,
};

const rootReducer = combineReducers(reducers);

export type RootState = StateFromReducersMapObject<typeof reducers>;
export default rootReducer;
