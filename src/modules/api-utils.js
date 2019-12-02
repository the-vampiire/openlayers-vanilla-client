export const endpointBuilder = apiURL => endpoint =>
  `${apiURL}${/^\//.test(endpoint) ? endpoint : `/${endpoint}`}`;
