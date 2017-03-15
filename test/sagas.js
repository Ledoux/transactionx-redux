import test from 'ava'
import { createReducer, getAppSchemaWithEntitiesByName } from 'entitiex'
import { entitiesByName,
  mergedTestFoosById,
  mergedTestFaaIds,
  mergedTestFooIds
} from '../node_modules/entitiex/lib/tests'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { call, fork, select, } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import { createTransactionxWatches } from '../lib'

test('createReducer', t => {
  // sagas
  const transactionxWatches = createTransactionxWatches()
  function * rootSaga () {
    yield [
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
})
