import { applyMiddleware, createStore, compose } from 'redux'
import { wrapStore, alias } from 'webext-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';

import {getForm, deleteForm, addForm} from './actions/formActions'


const aliases = {
  'alias@GET_FORM': getForm,
  'alias@DELETE_FORM': deleteForm,
  'alias@ADD_FORM': addForm
}

const store = createStore(
  reducer,
  loadState(),
    applyMiddleware(
      alias(aliases),
      thunk,
      logger,
    )
);

store.subscribe(throttle(() => {
  saveState({
    login: store.getState().login,
    formReducer: store.getState().formReducer
  })
}), 1000);

wrapStore(store, {
  portName: 'COUNTING',
})

export default store;