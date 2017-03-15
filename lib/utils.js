'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveDeep = retrieveDeep;
exports.getSagasFromImportObject = getSagasFromImportObject;
exports.isDeleteTransactionxAction = isDeleteTransactionxAction;
exports.isGetTransactionxAction = isGetTransactionxAction;
exports.isPostTransactionxAction = isPostTransactionxAction;
exports.isPutTransactionxAction = isPutTransactionxAction;
function retrieveDeep(object, pattern) {
  function iter(o, p, r) {
    Object.keys(p).forEach(function (k) {
      if (k in o) {
        if (p[k] !== null) {
          r[k] = {};
          iter(o[k], p[k], r[k]);
          return;
        }
        r[k] = o[k];
      }
    });
  }
  var result = {};
  iter(object, pattern, result);
  return result;
}

function getSagasFromImportObject(importObject) {
  return Object.keys(importObject)
  // filter only the watch function
  .filter(function (key) {
    return (/^watch/.test(key)
    );
  }).map(function (key) {
    return importObject[key];
  })
  // filter out other keys on import object
  .filter(function (saga) {
    return typeof saga === 'function';
  });
}

// here are the functions helping to determine if an action
// has the shape of a transactionx one.
// This could be completely customized at the createTransactionxWatches time
function isDeleteTransactionxAction(action) {
  return action.method && action.method === 'DELETE';
}
function isGetTransactionxAction(action) {
  return action.method && action.method === 'GET';
}
function isPostTransactionxAction(action) {
  return action.method && action.method === 'POST';
}
function isPutTransactionxAction(action) {
  return action.method && action.method === 'PUT';
}