import env from "./env.js";
import createSearchBox from "./dom/search-box.js";
import createDateSelect from "./dom/date-select.js";
import createDateRangeSearch from "./dom/date-range.js";
import {
  getDatesList,
  getSearchTerms,
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
  updateFeaturesByDateRangeSearch,
} from "./ol-zika/map-updaters.js";

const buildEndpoint = endpointBuilder(env.API_ORIGIN);
const reportsByDateEndpoint = buildReportsByDateEndpoint(buildEndpoint);
const reportsBySearchEndpoint = buildReportsBySearchEndpoint(buildEndpoint);

import createWMSLayers from "./ol-zika/wms-layers.js";

document.addEventListener("DOMContentLoaded", async () => {
  const map = createZikaMap();

  const wmsLayers = createWMSLayers(map);
  const reportsLayer = createGeoJSONReportsLayer({});

  map.addLayer(reportsLayer);
  wmsLayers.forEach(layerConfig => map.addLayer(layerConfig.layer));

  // TODO: pass wmsLayers to a toggle tool for showing / hiding
  // limit one layer visible at a time due to lag

  const dates = await getDatesList(buildEndpoint);
  const searchTerms = await getSearchTerms(buildEndpoint);

  const dateRangeSearch = createDateRangeSearch({
    dates,
    handleSearch: updateFeaturesByDateRangeSearch({ map, layer: reportsLayer }),
  });

  const dateSelect = createDateSelect({
    dates,
    handleDateChange: updateFeaturesByDateChange({
      layer: reportsLayer,
      reportsByDateEndpoint,
    }),
  });

  const searchBox = createSearchBox({
    searchTerms,
    handleSearch: updateFeaturesBySearch({
      layer: reportsLayer,
      reportsBySearchEndpoint,
    }),
  });

  document
    .querySelector("#search-tools")
    .append(dateSelect, searchBox, dateRangeSearch);
});
