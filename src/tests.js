import { getAppSchemaWithEntitiesByName } from 'entitiex'

import {
  deletedTestDeepEquals,
  deletedTestQuery,
  FIRST_TEST_COLLECTION_NAME,
  FIRST_TEST_API_URL,
  JOIN_FIRST_TEST_API_URL,
  gotTestDeepEquals,
  gotTestQuery,
  postedFirstTestDocuments,
  postedSecondTestDocuments,
  postedTestDeepEquals,
  putTestDeepEquals,
  putTestQuery,
  putTestUpdate,
  runQuickTransactionxExpressServer,
  SECOND_TEST_COLLECTION_NAME,
  SECOND_TEST_API_URL,
  TEST_MONGO_URL,
  TEST_PATH,
  TEST_PORT
} from '../node_modules/transactionx-express/lib/tests'

export const entitiesByName = {
  foos: {
    items: [
      { key: 'faaId', type: 'String', default: null },
      { key: 'id', type: 'String', default: null, isAutomatic: true },
      { key: 'myFaaId', type: 'String', default: null },
      { key: 'number', type: 'Number', default: null },
      { key: 'things', type: 'Array[String]', default: null },
      { key: 'theFaaIds', type: 'Array[String]', default: null },
      { key: 'txt', type: 'String', default: null },
      { key: 'yourFaaId', type: 'String', default: null }
    ],
    title: 'foo',
    type: 'collection'
  },
  faas: {
    items: [
      { key: 'id', type: 'String', default: null, isAutomatic: true },
      { key: 'txt', type: 'String', default: null }
    ],
    title: 'faa',
    type: 'collection'
  }
}

export function runQuickTransactionxClientServer() {
  // schema
  const appSchema = getAppSchemaWithEntitiesByName(entitiesByName)
  // return
  return new Promise((resolve, reject) => {
    runQuickTransactionxExpressServer()
      .then(({server, app, model}) => {
        resolve({ server, app, model, appSchema })
      })
      .catch(e => console.error(`Error in runQuickTransactionxExpressServer ${e}`))
    })
}
