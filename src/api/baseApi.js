import { BASE_URL } from '../constants';

function baseApi({
  path,
  method = 'GET',
  headers,
  body
}) {
  let newHeaders = headers;
  if (!newHeaders) {
    newHeaders = {};
  }
  const formatBody =
    !newHeaders || newHeaders['Content-Type'] !== 'application/json' ? body : JSON.stringify(body);
  const params = {
    method: !method ? 'GET' : method,
    timeout: 120000
  };
  if (newHeaders) {
    params.headers = newHeaders;
  }
  if (formatBody) {
    params.body = formatBody;
  }
  const fullUrl = `${BASE_URL}${path}`;
  return fetch(fullUrl, params).then(response =>
    response.json().then(json => {
      const resp = { status: response.status, data: json };
      return response.ok ? Promise.resolve(resp) : Promise.reject(resp);
    })
  );
}

export default baseApi;
