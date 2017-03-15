'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestConfigData = getRequestConfigData;
exports.deleteTransactionxData = deleteTransactionxData;
exports.getTransactionxData = getTransactionxData;
exports.postTransactionxData = postTransactionxData;
exports.putTransactionxData = putTransactionxData;
exports.createTransactionxWatches = createTransactionxWatches;

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _entitiex = require('entitiex');

var _apis = require('./apis');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked = [getRequestConfigData, deleteTransactionxData, getTransactionxData, postTransactionxData, putTransactionxData].map(regeneratorRuntime.mark);

// set the options in the fetch given authorization needed or not
function getRequestConfigData(url, authorization, getAuthorizationData) {
  var requestConfig, authToken;
  return regeneratorRuntime.wrap(function getRequestConfigData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          requestConfig = { url: url };

          if (!(authorization === 'jwt')) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return (0, _effects.call)(getAuthorizationData);

        case 4:
          authToken = _context.sent;

          Object.assign(requestConfig, {
            credentials: 'same-origin',
            headers: { Authorization: 'JWT ' + authToken }
          });

        case 6:
          return _context.abrupt('return', requestConfig);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

// SAGAS
function deleteTransactionxData(action, config) {
  var collectionName, COLLECTION_NAME, url, requestConfig, response, removePatch;
  return regeneratorRuntime.wrap(function deleteTransactionxData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // unpack
          if (typeof action.collectionName === 'undefined') {
            console.error('transactionx action needs a collectionName');
          }
          collectionName = action.collectionName;
          COLLECTION_NAME = collectionName.toUpperCase();
          url = action.url || '';
          // try

          _context2.prev = 4;
          _context2.next = 7;
          return (0, _effects.call)(getRequestConfigData, url, action.authorization, config.getAuthorizationData);

        case 7:
          requestConfig = _context2.sent;
          _context2.next = 10;
          return (0, _effects.call)(_apis.deleteRequest, collectionName, // route
          { query: action.query }, // body
          requestConfig);

        case 10:
          response = _context2.sent;

          // impedance
          removePatch = {};

          response.documents.forEach(function (document) {
            removePatch[document.id] = _entitiex.DELETE_PREFIX;
          });
          // sync the frontend state with that
          _context2.next = 15;
          return (0, _effects.put)({
            type: 'REMOVE_' + COLLECTION_NAME + '_ENTITIEX',
            entitiex: { unPatch: _defineProperty({}, collectionName + 'ById', removePatch) }
          });

        case 15:
          _context2.next = 17;
          return (0, _effects.put)({ type: 'SUCCESS_REQUEST_DELETE_SUCCESS' });

        case 17:
          return _context2.abrupt('return', response);

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2['catch'](4);
          _context2.next = 24;
          return (0, _effects.put)({ type: 'FAIL_REQUEST_DELETE_FAIL', error: _context2.t0.toString() });

        case 24:
          return _context2.abrupt('return', _context2.t0);

        case 25:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[4, 20]]);
}

function getTransactionxData(action, config) {
  var collectionName, COLLECTION_NAME, url, requestConfig, response;
  return regeneratorRuntime.wrap(function getTransactionxData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // unpack
          if (typeof action.collectionName === 'undefined') {
            console.error('transactionx action needs a collectionName');
          }
          collectionName = action.collectionName;
          COLLECTION_NAME = collectionName.toUpperCase();
          url = action.url || '';
          // try

          _context3.prev = 4;
          _context3.next = 7;
          return (0, _effects.call)(getRequestConfigData, url, action.authorization, config.getAuthorizationData);

        case 7:
          requestConfig = _context3.sent;
          _context3.next = 10;
          return (0, _effects.call)(_apis.getRequest, collectionName, action.query, requestConfig);

        case 10:
          response = _context3.sent;
          _context3.next = 13;
          return (0, _effects.put)({
            type: 'MERGE_' + COLLECTION_NAME + '_ENTITIEX',
            entitiex: { patch: _defineProperty({}, action.collectionName + 'ById', (0, _keyBy2.default)(response.documents, 'id')) }
          });

        case 13:
          _context3.next = 15;
          return (0, _effects.put)({ type: 'SUCCESS_REQUEST_GET_' + COLLECTION_NAME });

        case 15:
          return _context3.abrupt('return', response);

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3['catch'](4);
          _context3.next = 22;
          return (0, _effects.put)({ type: 'FAIL_REQUEST_GET_' + COLLECTION_NAME, error: _context3.t0.toString() });

        case 22:
          return _context3.abrupt('return', _context3.t0);

        case 23:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this, [[4, 18]]);
}

function postTransactionxData(action, config) {
  var collectionName, COLLECTION_NAME, url, entitiex, postedDocuments, defaultObject, requestConfig, response;
  return regeneratorRuntime.wrap(function postTransactionxData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // unpack
          if (typeof action.collectionName === 'undefined') {
            console.error('transactionx action needs a collectionName');
          }
          collectionName = action.collectionName;
          COLLECTION_NAME = collectionName.toUpperCase();
          url = action.url || '';
          // try

          _context4.prev = 4;
          _context4.next = 7;
          return (0, _effects.select)(function (state) {
            return state.entitiex;
          });

        case 7:
          entitiex = _context4.sent;
          postedDocuments = action.documents;

          if (entitiex) {
            defaultObject = entitiex.defaultsByCollectionName[collectionName];

            if (defaultObject) {
              postedDocuments = postedDocuments.map(function (document) {
                return Object.assign({}, defaultObject, document);
              });
            }
          }
          // config
          _context4.next = 12;
          return (0, _effects.call)(getRequestConfigData, url, action.authorization, config.getAuthorizationData);

        case 12:
          requestConfig = _context4.sent;
          _context4.next = 15;
          return (0, _effects.call)(_apis.postRequest, collectionName, // route
          { documents: postedDocuments }, // body
          requestConfig);

        case 15:
          response = _context4.sent;
          _context4.next = 18;
          return (0, _effects.put)({
            type: 'MERGE_' + COLLECTION_NAME + '_ENTITIEX',
            entitiex: { patch: _defineProperty({}, collectionName + 'ById', (0, _keyBy2.default)(response.documents, 'id')) }
          });

        case 18:
          _context4.next = 20;
          return (0, _effects.put)({ type: 'SUCCESS_REQUEST_POST_SUCCESS' });

        case 20:
          return _context4.abrupt('return', response);

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4['catch'](4);
          _context4.next = 27;
          return (0, _effects.put)({ type: 'FAIL_REQUEST_POST_FAIL', error: _context4.t0.toString() });

        case 27:
          return _context4.abrupt('return', _context4.t0);

        case 28:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this, [[4, 23]]);
}

function putTransactionxData(action, config) {
  var collectionName, COLLECTION_NAME, url, requestConfig, response;
  return regeneratorRuntime.wrap(function putTransactionxData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // unpack
          if (typeof action.collectionName === 'undefined') {
            console.error('transactionx action needs a collectionName');
          }
          collectionName = action.collectionName;
          COLLECTION_NAME = collectionName.toUpperCase();
          url = action.url || '';
          // try

          _context5.prev = 4;
          _context5.next = 7;
          return (0, _effects.call)(getRequestConfigData, url, action.authorization, config.getAuthorizationData);

        case 7:
          requestConfig = _context5.sent;
          _context5.next = 10;
          return (0, _effects.call)(_apis.putRequest, collectionName, { update: action.update, query: action.query }, // body
          requestConfig);

        case 10:
          response = _context5.sent;
          _context5.next = 13;
          return (0, _effects.put)({
            type: 'MERGE_' + COLLECTION_NAME + '_ENTITIEX',
            entitiex: { patch: _defineProperty({}, collectionName + 'ById', (0, _keyBy2.default)(response.documents, 'id')) }
          });

        case 13:
          _context5.next = 15;
          return (0, _effects.put)({ type: 'SUCCESS_REQUEST_PUT_SUCCESS' });

        case 15:
          return _context5.abrupt('return', response);

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5['catch'](4);
          _context5.next = 22;
          return (0, _effects.put)({ type: 'FAIL_REQUEST_PUT_FAIL', error: _context5.t0.toString() });

        case 22:
          return _context5.abrupt('return', _context5.t0);

        case 23:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this, [[4, 18]]);
}

// WATCHES
function createTransactionxWatches(config) {
  var _marked2 = [deleteHookData, getHookData, postHookData, putHookData, watchRequestDeleteTransactionx, watchRequestGetTransactionx, watchRequestPostTransactionx, watchRequestPutTransactionx].map(regeneratorRuntime.mark);

  // default
  config = config || {};
  // unpack
  var getAuthorizationData = config.getAuthorizationData;
  // determine the condition to trigger the transactionx data saga
  var isDeleteCondition = config.isDeleteTransactionxAction || config.isTransactionxAction || _utils.isDeleteTransactionxAction;
  var isGetCondition = config.isGetTransactionxAction || config.isTransactionxAction || _utils.isGetTransactionxAction;
  var isPostCondition = config.isPostTransactionxAction || config.isTransactionxAction || _utils.isPostTransactionxAction;
  var isPutCondition = config.isPutTransactionxAction || config.isTransactionxAction || _utils.isPutTransactionxAction;
  // dataConfig
  var dataConfig = { getAuthorizationData: getAuthorizationData };
  // determine the hooks to be triggered
  function deleteHookData(action) {
    return regeneratorRuntime.wrap(function deleteHookData$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _effects.call)(deleteTransactionxData, action, dataConfig);

          case 2:
            return _context6.abrupt('return', _context6.sent);

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked2[0], this);
  }
  function getHookData(action) {
    return regeneratorRuntime.wrap(function getHookData$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _effects.call)(getTransactionxData, action, dataConfig);

          case 2:
            return _context7.abrupt('return', _context7.sent);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _marked2[1], this);
  }
  function postHookData(action) {
    return regeneratorRuntime.wrap(function postHookData$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _effects.call)(postTransactionxData, action, dataConfig);

          case 2:
            return _context8.abrupt('return', _context8.sent);

          case 3:
          case 'end':
            return _context8.stop();
        }
      }
    }, _marked2[2], this);
  }
  function putHookData(action) {
    return regeneratorRuntime.wrap(function putHookData$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _effects.call)(putTransactionxData, action, dataConfig);

          case 2:
            return _context9.abrupt('return', _context9.sent);

          case 3:
          case 'end':
            return _context9.stop();
        }
      }
    }, _marked2[3], this);
  }
  // create the watches
  function watchRequestDeleteTransactionx() {
    return regeneratorRuntime.wrap(function watchRequestDeleteTransactionx$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.delegateYield((0, _reduxSaga.takeEvery)(isDeleteCondition, deleteHookData), 't0', 1);

          case 1:
          case 'end':
            return _context10.stop();
        }
      }
    }, _marked2[4], this);
  }
  function watchRequestGetTransactionx() {
    return regeneratorRuntime.wrap(function watchRequestGetTransactionx$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.delegateYield((0, _reduxSaga.takeEvery)(isGetCondition, getHookData), 't0', 1);

          case 1:
          case 'end':
            return _context11.stop();
        }
      }
    }, _marked2[5], this);
  }
  function watchRequestPostTransactionx() {
    return regeneratorRuntime.wrap(function watchRequestPostTransactionx$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.delegateYield((0, _reduxSaga.takeEvery)(isPostCondition, postHookData), 't0', 1);

          case 1:
          case 'end':
            return _context12.stop();
        }
      }
    }, _marked2[6], this);
  }
  function watchRequestPutTransactionx() {
    return regeneratorRuntime.wrap(function watchRequestPutTransactionx$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.delegateYield((0, _reduxSaga.takeEvery)(isPutCondition, putHookData), 't0', 1);

          case 1:
          case 'end':
            return _context13.stop();
        }
      }
    }, _marked2[7], this);
  }
  // return
  return [watchRequestDeleteTransactionx, watchRequestGetTransactionx, watchRequestPostTransactionx, watchRequestPutTransactionx];
}