'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entitiesByName = undefined;
exports.runQuickTransactionxClientServer = runQuickTransactionxClientServer;

var _entitiex = require('entitiex');

var _tests = require('../node_modules/transactionx-express/lib/tests');

var entitiesByName = exports.entitiesByName = {
  foos: {
    items: [{ key: 'faaId', type: 'String', default: null }, { key: 'id', type: 'String', default: null, isAutomatic: true }, { key: 'myFaaId', type: 'String', default: null }, { key: 'number', type: 'Number', default: null }, { key: 'things', type: 'Array[String]', default: null }, { key: 'theFaaIds', type: 'Array[String]', default: null }, { key: 'txt', type: 'String', default: null }, { key: 'yourFaaId', type: 'String', default: null }],
    title: 'foo',
    type: 'collection'
  },
  faas: {
    items: [{ key: 'id', type: 'String', default: null, isAutomatic: true }, { key: 'txt', type: 'String', default: null }],
    title: 'faa',
    type: 'collection'
  }
};

function runQuickTransactionxClientServer() {
  // schema
  var appSchema = (0, _entitiex.getAppSchemaWithEntitiesByName)(entitiesByName);
  // return
  return new Promise(function (resolve, reject) {
    (0, _tests.runQuickTransactionxExpressServer)().then(function (_ref) {
      var server = _ref.server,
          app = _ref.app,
          model = _ref.model;

      resolve({ server: server, app: app, model: model, appSchema: appSchema });
    }).catch(function (e) {
      return console.error('Error in runQuickTransactionxExpressServer ' + e);
    });
  });
}