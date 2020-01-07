export const endpointBuilder = apiURL => endpoint =>
  `${apiURL}${/^\//.test(endpoint) ? endpoint : `/${endpoint}`}`;

export const buildReportsByDateEndpoint = buildEndpoint => date =>
  buildEndpoint(`/reports?date=${date}`);

export const buildReportsBySearchEndpoint = buildEndpoint => (term, value) =>
  buildEndpoint(`/reports/search?term=${term}&value=${value}`);

export const getDatesList = buildEndpoint =>
  fetch(buildEndpoint("/reports/dates")).then(res => res.json());

export const getSearchTerms = buildEndpoint =>
  fetch(buildEndpoint("/reports/search/terms")).then(res => res.json());
