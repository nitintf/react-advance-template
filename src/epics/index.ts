import { combineEpics } from 'redux-observable';
import * as authEpics from './auth.epic';

export const rootEpic = combineEpics(...Object.values(authEpics));
