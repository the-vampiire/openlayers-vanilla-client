export const API_URL = "http://localhost:8080";

export const endpointBuilder = apiURL => endpoint =>
  `${apiURL}${/^\//.test(endpoint) ? endpoint : `/${endpoint}`}`;

export default endpointBuilder(API_URL);
