import 'babel-polyfill'

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from './apis'
import {
  createTransactionxWatches,
  deleteTransactionxData,
  getTransactionxData,
  postTransactionxData,
  putTransactionxData
} from './sagas'
import {
  getSagasFromImportObject,
  isGetTransactionxAction,
  isPostTransactionxAction,
  isPutTransactionxAction,
  isDeleteTransactionxAction,
  retrieveDeep
} from './utils'

export {
  createTransactionxWatches,
  deleteRequest,
  deleteTransactionxData,
  getRequest,
  getSagasFromImportObject,
  getTransactionxData,
  postRequest,
  postTransactionxData,
  putRequest,
  putTransactionxData,
  retrieveDeep
}
const transactionx = {
  createTransactionxWatches,
  deleteRequest,
  deleteTransactionxData,
  getRequest,
  getSagasFromImportObject,
  getTransactionxData,
  postRequest,
  postTransactionxData,
  putRequest,
  putTransactionxData,
  retrieveDeep
}
export default transactionx
