import env from "./env.js";
import createSearchBox from "./dom/search-box.js";
import createDateSelect from "./dom/date-select.js";
import {
  endpointBuilder,
  buildReportsByDateEndpoint,
  buildReportsBySearchEndpoint,
} from "./api-utils.js";
import {
  createZikaMap,
  createGeoJSONReportsLayer,
} from "./ol-zika/map-utils.js";
import {
  updateFeaturesBySearch,
  updateFeaturesByDateChange,
} from "./ol-zika/map-updaters.js";
import { getFeatures } from "./ol-zika/geoserver.js";

const buildEndpoint = endpointBuilder(env.API_ORIGIN);
const reportsByDateEndpoint = buildReportsByDateEndpoint(buildEndpoint);
const reportsBySearchEndpoint = buildReportsBySearchEndpoint(buildEndpoint);

document.addEventListener("DOMContentLoaded", async () => {
  const map = createZikaMap();
  const reportsLayer = createGeoJSONReportsLayer({});

  map.addLayer(reportsLayer);

  await createDateSelect({
    buildEndpoint,
    handleDateChange: updateFeaturesByDateChange(
      reportsLayer,
      reportsByDateEndpoint,
    ),
  });

  await createSearchBox({
    buildEndpoint,
    handleSearch: updateFeaturesBySearch(reportsLayer, reportsBySearchEndpoint),
  });

  getFeatures().then(features => {
    const source = new ol.source.Vector({
      features,
      format: new ol.format.GeoJSON(),
    });

    reportsLayer.setSource(source);
    map.getView().fit(source.getExtent());
  });
});
