import env from "../env.js";
const { WFS, GeoJSON, filter } = ol.format;

const casesAboveZeroFilter = new filter.GreaterThan("cases", 0);

const buildFilter = (dateRange, includeZeroCases) => {
  const { startDate, endDate } = dateRange;

  const dateRangeFilter = new filter.IsBetween(
    "report_date",
    startDate,
    endDate,
  );

  return includeZeroCases
    ? dateRangeFilter
    : new filter.And(dateRangeFilter, casesAboveZeroFilter);
};

const writeGetFeatureBody = (dateRange, includeZeroCases) => {
  const filter = buildFilter(dateRange, includeZeroCases);

  return new WFS().writeGetFeature({
    filter,
    srsName: "EPSG:3857",
    featurePrefix: "zika",
    outputFormat: "application/json",
    featureTypes: ["locations_with_cases_by_date"],
    featureNS: "https://zika.devops.launchcode.org",
  });
};

export const getGeoserverFeatures = (dateRange, includeZeroCases = false) =>
  fetch(`${env.GEOSERVER_ORIGIN}/geoserver/wfs`, {
    method: "POST",
    body: new XMLSerializer().serializeToString(
      writeGetFeatureBody(dateRange, includeZeroCases),
    ),
  })
    .then(res => res.json())
    .then(json => new GeoJSON().readFeatures(json));
