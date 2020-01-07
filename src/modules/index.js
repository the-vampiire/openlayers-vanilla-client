import API_ORIGIN from "./api-origin.js";
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

const buildEndpoint = endpointBuilder(API_ORIGIN);
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
});
