
import { StoreManager } from '@mcfed/core';
import { CombinedState, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';

const makeRootReducer: CombinedState<any> = (asyncReducers: any) => {
    return combineReducers(asyncReducers)
  };

  const store = new StoreManager(
    undefined,
    [
      createLogger()
    ],
    makeRootReducer
  );

export default store;
