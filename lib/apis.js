'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.deleteRequest = deleteRequest;
exports.getRequest = getRequest;
exports.postRequest = postRequest;
exports.putRequest = putRequest;
function getFetchArgs(collectionName, bodyOrQuery, config, method) {
  // url
  var url = config.url || '';
  var fetchUrl = url.replace(/\/$/, '') + '/' + collectionName;
  if (method === 'GET' && typeof bodyOrQuery === 'string') {
    fetchUrl = fetchUrl + '?' + bodyOrQuery;
  }
  // options
  var fetchConfig = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (method !== 'GET') {
    fetchConfig.body = bodyOrQuery;
  }
  if (typeof config.credentials !== 'undefined') {
    fetchConfig.credentials = config.credentials;
  }
  if (typeof config.headers !== 'undefined') {
    if (typeof config.headers.Authorization !== 'undefined') {
      fetchConfig.headers.Authorization = config.headers.Authorization;
    }
  }
  fetchConfig.method = method;
  // return
  return [fetchUrl, fetchConfig];
}

function deleteRequest(collectionName, body, config) {
  // unpack
  var _getFetchArgs = getFetchArgs(collectionName, body, config, 'DELETE'),
      _getFetchArgs2 = _slicedToArray(_getFetchArgs, 2),
      deleteUrl = _getFetchArgs2[0],
      deleteConfig = _getFetchArgs2[1];
  // fetch


  return window.fetch(deleteUrl, deleteConfig).then(function (req) {
    return req.json();
  }).then(function (json) {
    return json || {};
  });
}

function getRequest(collectionName, query, config) {
  // unpack
  var _getFetchArgs3 = getFetchArgs(collectionName, query, config, 'GET'),
      _getFetchArgs4 = _slicedToArray(_getFetchArgs3, 2),
      getUrl = _getFetchArgs4[0],
      getConfig = _getFetchArgs4[1];
  // fetch


  return window.fetch(getUrl, getConfig).then(function (req) {
    return req.json();
  }).then(function (json) {
    return json || {};
  });
}

function postRequest(collectionName, body, config) {
  // unpack
  var _getFetchArgs5 = getFetchArgs(collectionName, body, config, 'POST'),
      _getFetchArgs6 = _slicedToArray(_getFetchArgs5, 2),
      postUrl = _getFetchArgs6[0],
      postConfig = _getFetchArgs6[1];
  // fetch


  return window.fetch(postUrl, postConfig).then(function (req) {
    return req.json();
  }).then(function (json) {
    return json || {};
  });
}

function putRequest(collectionName, body, config) {
  // unpack
  var _getFetchArgs7 = getFetchArgs(collectionName, body, config, 'PUT'),
      _getFetchArgs8 = _slicedToArray(_getFetchArgs7, 2),
      putUrl = _getFetchArgs8[0],
      putConfig = _getFetchArgs8[1];
  // fetch


  return window.fetch(putUrl, putConfig).then(function (req) {
    return req.json();
  }).then(function (json) {
    return json || {};
  });
}