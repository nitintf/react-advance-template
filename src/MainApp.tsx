import { actions } from 'app/reducers/auth.reducer';
import React from 'react';
import { useDispatch } from 'react-redux';

const MainApp = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(actions.fetchRandomData())}>Nitin</button>
    </>
  );
};

export default MainApp;
