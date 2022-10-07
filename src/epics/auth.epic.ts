import { actions, ActionType } from 'app/reducers/auth.reducer';
import axios from 'axios';
import { Action, AnyAction } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export const fetchRandomData: Epic<AnyAction, any> = (
  action$: Observable<Action>
): Observable<Action> => {
  return action$.pipe(
    ofType(ActionType.RANDOM_FETCH),
    map(() => of(actions.fetchRandomDataStart())),
    switchMap((_action) =>
      from(axios.get('https://jsonplaceholder.typicode.com/todos/1')).pipe(
        map((response) => actions.fecthRandomDataSuccess(response.data)),
        catchError((error) => of(actions.fecthRandomDataSuccess(error.data)))
      )
    )
  );
};
