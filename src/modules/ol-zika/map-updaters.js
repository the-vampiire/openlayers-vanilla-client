import createLocationToggles from "../dom/location-toggles.js";

const createVectorSource = url => {
  const reportsSource = new ol.source.Vector({
    url,
    format: new ol.format.GeoJSON(),
  });

  reportsSource.once("change", () => {
    if (reportsSource.getState() === "ready") {
      createLocationToggles(reportsSource.getFeatures());
    }
  });

  return reportsSource;
};

export const updateFeaturesByDateChange = (
  reportsLayer,
  reportsByDateEndpoint,
) => event => {
  const reportsDate = event.target.value;

  reportsLayer.setSource(
    createVectorSource(reportsByDateEndpoint(reportsDate)),
  );
};

/**
 *
 * @param {ol.layer.Vector} reportsLayer
 * @param {function} buildEndpoint
 */
export const updateFeaturesBySearch = (
  reportsLayer,
  reportsBySearchEndpoint,
) => async (term, value) => {
  reportsLayer.setSource(
    createVectorSource(reportsBySearchEndpoint(term, value)),
  );
};
