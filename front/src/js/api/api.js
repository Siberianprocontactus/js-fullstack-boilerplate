import querystring from'query-string';
import format from'string-template';

import * as targets from './targets.js';

const _fetch = async params => {
  console.log(`${params.method}:${params.target} ->`, params);
  const {
    target, 
    method,
    data,
  } = params;

  const body = JSON.stringify(params.body);
  const { token } = localStorage;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  const url = format(target, data);

  let result = await fetch(url, {
    method,
    headers,
    body,
  });

  result = await result.json();

  if (!result.ok)
    throw result;

  console.log(`${params.method}:${params.target} <-`, url, result);
  return result.result;
};

class Api {
  get(params) {
    return _fetch({
      ...params,
      method: 'GET',
    })
  }

  post(params) {
    return _fetch({
      ...params,
      method: 'POST',
    })
  }

  del(params) {
    return _fetch({
      ...params,
      method: 'DELETE',
    })
  }
}

const api = new Api();

api.template = templateID => api.get({target: targets.TEMPLATE, data: {templateID}});

export default api;