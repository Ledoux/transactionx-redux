export function retrieveDeep (object, pattern) {
  function iter (o, p, r) {
    Object.keys(p).forEach(
      function (k) {
        if (k in o) {
          if (p[k] !== null) {
            r[k] = {}
            iter(o[k], p[k], r[k])
            return
          }
          r[k] = o[k]
        }
      }
    )
  }
  const result = {}
  iter(object, pattern, result)
  return result
}

export function getSagasFromImportObject (importObject) {
  return Object.keys(importObject)
  // filter only the watch function
  .filter(key => /^watch/.test(key))
  .map(key => importObject[key])
  // filter out other keys on import object
  .filter(saga => typeof saga === 'function')
}

// here are the functions helping to determine if an action
// has the shape of a transactionx one.
// This could be completely customized at the createTransactionxWatches time
export function isDeleteTransactionxAction (action) {
  return action.method && action.method === 'DELETE'
}
export function isGetTransactionxAction (action) {
  return action.method && action.method === 'GET'
}
export function isPostTransactionxAction (action) {
  return action.method && action.method === 'POST'
}
export function isPutTransactionxAction (action) {
  return action.method && action.method === 'PUT'
}
