import { applyMiddleware, createStore, compose } from 'redux'
import { wrapStore, alias } from 'webext-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';

import {getForm, deleteForm, addForm, getIndivForm, updateForm, addFormToUpdate} from './actions/formActions'
import {getField, deleteField} from './actions/formFieldActions'
import {getLogin} from './actions/actions'

const aliases = {
  'alias@GET_FORM': getForm,
  'alias@DELETE_FORM': deleteForm,
  'alias@ADD_FORM': addForm,
  'alias@GET_INDIV_FORM': getIndivForm,
  'alias@UPDATE_FORM': updateForm,
  'alias@GET_FIELD': getField,
  'alias@DELETE_FIELD': deleteField,
  'adias@ADD_FORM_TO_UPDATE': addFormToUpdate,
  'adias@LOGIN': getLogin
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