import env from "../env.js";
const { WFS, GeoJSON, filter } = ol.format;

const writeGetFeatureBody = dateRange => {
  const { startDate, endDate } = dateRange;

  const startDateFilter = new filter.IsBetween(
    "report_date",
    startDate,
    endDate,
  );

  return new WFS().writeGetFeature({
    srsName: "EPSG:3857",
    featurePrefix: "zika",
    outputFormat: "application/json",
    featureTypes: ["locations_with_cases_by_date"],
    featureNS: "https://zika.devops.launchcode.org",
    filter: startDateFilter,
  });
};

export const getGeoserverFeatures = dateRange =>
  fetch(`${env.GEOSERVER_ORIGIN}/geoserver/wfs`, {
    method: "POST",
    body: new XMLSerializer().serializeToString(writeGetFeatureBody(dateRange)),
  })
    .then(res => res.json())
    .then(json => new GeoJSON().readFeatures(json));
