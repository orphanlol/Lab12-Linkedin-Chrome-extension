import { applyMiddleware, createStore, compose } from 'redux'
import { wrapStore, alias } from 'webext-redux'
import { logger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';

import {getForm, deleteForm, addForm, getIndivForm, updateForm, addFormToUpdate, initialForm} from './actions/formActions'
import {getField, deleteField, initialField} from './actions/formFieldActions'
import {getLogin} from './actions/actions'

const aliases = {
  'alias@GET_FORM': getForm,
  'alias@DELETE_FORM': deleteForm,
  'alias@ADD_FORM': addForm,
  'alias@GET_INDIV_FORM': getIndivForm,
  'alias@UPDATE_FORM': updateForm,
  'alias@GET_FIELD': getField,
  'alias@DELETE_FIELD': deleteField,
  'alias@ADD_FORM_TO_UPDATE': addFormToUpdate,
  'alias@LOGIN': getLogin,
  'alias@INITIAL_FORM': initialForm,
  'alias@INITIAL_FIELD': initialField
}

const store = createStore(
  reducer,
  loadState(),
    applyMiddleware(
      alias(aliases),
      thunkMiddleware,
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