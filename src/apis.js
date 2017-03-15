function getFetchArgs (collectionName, bodyOrQuery, config, method) {
  // url
  const url = config.url || ''
  let fetchUrl = `${url.replace(/\/$/, '')}/${collectionName}`
  if (method === 'GET' && typeof bodyOrQuery === 'string') {
    fetchUrl = `${fetchUrl}?${bodyOrQuery}`
  }
  // options
  const fetchConfig = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (method !== 'GET') {
    fetchConfig.body = bodyOrQuery
  }
  if (typeof config.credentials !== 'undefined') {
    fetchConfig.credentials = config.credentials
  }
  if (typeof config.headers !== 'undefined') {
    if (typeof config.headers.Authorization !== 'undefined') {
      fetchConfig.headers.Authorization = config.headers.Authorization
    }
  }
  fetchConfig.method = method
  // return
  return [fetchUrl, fetchConfig]
}

export function deleteRequest (collectionName, body, config) {
  // unpack
  const [deleteUrl, deleteConfig] = getFetchArgs(collectionName, body, config, 'DELETE')
  // fetch
  return window.fetch(deleteUrl, deleteConfig)
               .then(req => req.json())
               .then(json => json || {})
}

export function getRequest (collectionName, query, config) {
  // unpack
  const [getUrl, getConfig] = getFetchArgs(collectionName, query, config, 'GET')
  // fetch
  return window.fetch(getUrl, getConfig)
               .then(req => req.json())
               .then(json => json || {})
}

export function postRequest (collectionName, body, config) {
  // unpack
  const [postUrl, postConfig] = getFetchArgs(collectionName, body, config, 'POST')
  // fetch
  return window.fetch(postUrl, postConfig)
                .then(req => req.json())
                .then(json => json || {})
}

export function putRequest (collectionName, body, config) {
  // unpack
  const [putUrl, putConfig] = getFetchArgs(collectionName, body, config, 'PUT')
  // fetch
  return window.fetch(putUrl, putConfig)
                .then(req => req.json())
                .then(json => json || {})
}
