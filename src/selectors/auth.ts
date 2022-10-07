import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/reducers';

export const stateSelector = (state: RootState) => state;

export const authSelector = createSelector(stateSelector, (state: RootState) => state.users);
