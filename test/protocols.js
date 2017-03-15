import test from 'ava'
import { createReducer, getAppSchemaWithEntitiesByName } from 'entitiex'
import { entitiesByName,
  mergedTestFoosById,
  mergedTestFaaIds,
  mergedTestFooIds
} from '../node_modules/entitiex/lib/tests'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { call, fork, select, } from 'redux-saga/effects'
import createSagaMiddleware, { takeEvery } from 'redux-saga'

import { createTransactionxWatches } from '../lib'
import { runQuickTransactionxClientServer } from '../lib/tests'

test('createReducer', t => {
  // sagas
  const transactionxWatches = createTransactionxWatches()
  function * watchRequestGetFoos () {
    /*
    yield * takeEvery(['SUCCESS_REQUEST_GET_FOOS'], (action) => {
      console.log('OUAI')
    })
    */
    yield * takeEvery(['FAIL_REQUEST_GET_FOOS'], (action) => {
      console.log(action)
    })
  }
  function * rootSaga () {
    yield [
      watchRequestGetFoos,
      ...transactionxWatches
    ].map(fork)
  }
  const sagaMiddleware = createSagaMiddleware()
  const storeEnhancer = compose(applyMiddleware(sagaMiddleware))
  // reducer
  const appSchema = getAppSchemaWithEntitiesByName(entitiesByName)
  const entitiex = createReducer({ schema: appSchema })
  // it is still for now required to use it with a combineReducer
  const rootReducer = combineReducers({entitiex})
  // store
  const store = createStore(rootReducer, storeEnhancer)
  sagaMiddleware.run(rootSaga)
  // server
  runQuickTransactionxClientServer()
    .then((server, app, model, appSchema) => {
      // call
      store.dispatch({
        collectionName: 'foos',
        method: 'GET',
        query: 'number=1',
        type: 'REQUEST_GET_FOOS',
        url: 'http://localhost:5000/api'
      })
      // state

      // close
      model.db.close()
      server.close()
    })
})


/*
// dispatch
/*
store.dispatch({
  type: 'MERGE_FOOS_ENTITIEX',
  entitiex: { patch: { foosById: mergedTestFoosById } }
})
const state = store.getState()
t.deepEqual([
  Object.keys(state.entitiex.foosById).sort(),
  Object.keys(state.entitiex.faasById).sort()
],[
  mergedTestFooIds,
  mergedTestFaaIds
])
*/
