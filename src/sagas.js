import keyBy from 'lodash/keyBy'
import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { DELETE_PREFIX } from 'entitiex'

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from './apis'
import {
  isGetTransactionxAction,
  isPostTransactionxAction,
  isPutTransactionxAction,
  isDeleteTransactionxAction
} from './utils'

// set the options in the fetch given authorization needed or not
export function * getRequestConfigData (url, authorization, getAuthorizationData) {
  const requestConfig = { url }
  if (authorization === 'jwt') {
    let authToken = yield call(getAuthorizationData)
    Object.assign(requestConfig, {
      credentials: 'same-origin',
      headers: { Authorization: `JWT ${authToken}` }
    })
  }
  return requestConfig
}

// SAGAS
export function * deleteTransactionxData (action, config) {
  // unpack
  if (typeof action.collectionName === 'undefined') {
    console.error('transactionx action needs a collectionName')
  }
  const collectionName = action.collectionName
  const COLLECTION_NAME = collectionName.toUpperCase()
  const url = action.url || ''
  // try
  try {
    // config
    const requestConfig = yield call(getRequestConfigData,
      url,
      action.authorization,
      config.getAuthorizationData
    )
    // api
    let response = yield call(deleteRequest,
      collectionName, // route
      { query: action.query }, // body
      requestConfig
    )
    // impedance
    const removePatch = {}
    response.documents.forEach(document => { removePatch[document.id] = DELETE_PREFIX })
    // sync the frontend state with that
    yield put({
      type: `REMOVE_${COLLECTION_NAME}_ENTITIEX`,
      entitiex: { unPatch: { [`${collectionName}ById`]: removePatch } }
    })
    // success
    yield put({ type: 'SUCCESS_REQUEST_DELETE_SUCCESS' })
    // return
    return response
  } catch (error) {
    // error
    yield put({ type: 'FAIL_REQUEST_DELETE_FAIL', error: error.toString() })
    // return
    return error
  }
}

export function * getTransactionxData (action, config) {
  // unpack
  if (typeof action.collectionName === 'undefined') {
    console.error('transactionx action needs a collectionName')
  }
  const collectionName = action.collectionName
  const COLLECTION_NAME = collectionName.toUpperCase()
  const url = action.url || ''
  // try
  try {
    // config
    const requestConfig = yield call(getRequestConfigData,
      url,
      action.authorization,
      config.getAuthorizationData
    )
    // call the async api to get the payloads documents
    let response = yield call(getRequest,
      collectionName,
      action.query,
      requestConfig
    )
    // now we need to sync the entitiex frontend with that
    yield put({
      type: `MERGE_${COLLECTION_NAME}_ENTITIEX`,
      entitiex: { patch: { [`${action.collectionName}ById`]: keyBy(response.documents, 'id') } }
    })
    // success
    yield put({ type: `SUCCESS_REQUEST_GET_${COLLECTION_NAME}` })
    // return
    return response
  } catch (error) {
    // error
    yield put({ type: `FAIL_REQUEST_GET_${COLLECTION_NAME}`, error: error.toString() })
    // return
    return error
  }
}

export function * postTransactionxData (action, config) {
  // unpack
  if (typeof action.collectionName === 'undefined') {
    console.error('transactionx action needs a collectionName')
  }
  const collectionName = action.collectionName
  const COLLECTION_NAME = collectionName.toUpperCase()
  const url = action.url || ''
  // try
  try {
    // check if there is not an entitiex state in which we can find some default atrributes
    // to inject inside our new documents
    let entitiex = yield select(state => state.entitiex)
    let postedDocuments = action.documents
    if (entitiex) {
      const defaultObject = entitiex.defaultsByCollectionName[collectionName]
      if (defaultObject) {
        postedDocuments = postedDocuments.map(document =>
          Object.assign({}, defaultObject, document))
      }
    }
    // config
    const requestConfig = yield call(getRequestConfigData,
      url,
      action.authorization,
      config.getAuthorizationData
    )
    // api
    let response = yield call(postRequest,
      collectionName, // route
      { documents: postedDocuments }, // body
      requestConfig
    )
    // sync the frontend state with that
    yield put({
      type: `MERGE_${COLLECTION_NAME}_ENTITIEX`,
      entitiex: { patch: { [`${collectionName}ById`]: keyBy(response.documents, 'id') } }
    })
    // success
    yield put({ type: 'SUCCESS_REQUEST_POST_SUCCESS' })
    // return
    return response
  } catch (error) {
    // error
    yield put({ type: 'FAIL_REQUEST_POST_FAIL', error: error.toString() })
    // return
    return error
  }
}

export function * putTransactionxData (action, config) {
  // unpack
  if (typeof action.collectionName === 'undefined') {
    console.error('transactionx action needs a collectionName')
  }
  const collectionName = action.collectionName
  const COLLECTION_NAME = collectionName.toUpperCase()
  const url = action.url || ''
  // try
  try {
    // config
    const requestConfig = yield call(getRequestConfigData,
      url,
      action.authorization,
      config.getAuthorizationData
    )
    // api
    let response = yield call(putRequest,
      collectionName,
      { update: action.update, query: action.query }, // body
      requestConfig
    )
    // sync the frontend state with that
    yield put({
      type: `MERGE_${COLLECTION_NAME}_ENTITIEX`,
      entitiex: { patch: { [`${collectionName}ById`]: keyBy(response.documents, 'id') } }
    })
    // success
    yield put({ type: 'SUCCESS_REQUEST_PUT_SUCCESS' })
    // return
    return response
  } catch (error) {
    // error
    yield put({ type: 'FAIL_REQUEST_PUT_FAIL', error: error.toString() })
    // return
    return error
  }
}

// WATCHES
export function createTransactionxWatches (config) {
  // default
  config = config || {}
  // unpack
  const getAuthorizationData = config.getAuthorizationData
  // determine the condition to trigger the transactionx data saga
  const isDeleteCondition = config.isDeleteTransactionxAction ||
    config.isTransactionxAction || isDeleteTransactionxAction
  const isGetCondition = config.isGetTransactionxAction ||
    config.isTransactionxAction || isGetTransactionxAction
  const isPostCondition = config.isPostTransactionxAction ||
    config.isTransactionxAction || isPostTransactionxAction
  const isPutCondition = config.isPutTransactionxAction ||
    config.isTransactionxAction || isPutTransactionxAction
  // dataConfig
  const dataConfig = { getAuthorizationData }
  // determine the hooks to be triggered
  function * deleteHookData (action) {
    return yield call(deleteTransactionxData, action, dataConfig)
  }
  function * getHookData (action) {
    return yield call(getTransactionxData, action, dataConfig)
  }
  function * postHookData (action) {
    return yield call(postTransactionxData, action, dataConfig)
  }
  function * putHookData (action) {
    return yield call(putTransactionxData, action, dataConfig)
  }
  // create the watches
  function * watchRequestDeleteTransactionx () {
    yield * takeEvery(isDeleteCondition, deleteHookData)
  }
  function * watchRequestGetTransactionx () {
    yield * takeEvery(isGetCondition, getHookData)
  }
  function * watchRequestPostTransactionx () {
    yield * takeEvery(isPostCondition, postHookData)
  }
  function * watchRequestPutTransactionx () {
    yield * takeEvery(isPutCondition, putHookData)
  }
  // return
  return [
    watchRequestDeleteTransactionx,
    watchRequestGetTransactionx,
    watchRequestPostTransactionx,
    watchRequestPutTransactionx
  ]
}
