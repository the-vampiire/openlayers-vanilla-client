import env from "./env.js";
import createSearchBox from "./dom/search-box.js";
import createDateSelect from "./dom/date-select.js";
import createDateRangeSearch from "./dom/date-range.js";
import createLayerToggles from "./dom/layer-toggles.js";
import createWMSLayers from "./ol-zika/wms-layers.js";
import {
  getDatesList,
  getSearchTerms,
  endpointBuilder,
  buildReportsByDateEndpoint,
  buildReportsBySearchEndpoint,
} from "./api-utils.js";
import { createZikaMap, createZikaReportsLayer } from "./ol-zika/map-utils.js";
import {
  updateFeaturesBySearch,
  updateFeaturesByDateChange,
  updateFeaturesByDateRangeSearch,
} from "./ol-zika/map-updaters.js";

const buildEndpoint = endpointBuilder(env.API_ORIGIN);
const reportsByDateEndpoint = buildReportsByDateEndpoint(buildEndpoint);
const reportsBySearchEndpoint = buildReportsBySearchEndpoint(buildEndpoint);

document.addEventListener("DOMContentLoaded", async () => {
  // -- API DATA -- //
  const dates = await getDatesList(buildEndpoint);
  const searchTerms = await getSearchTerms(buildEndpoint);

  // -- OPENLAYERS -- //
  const map = createZikaMap();

  const wmsLayerConfigs = createWMSLayers();
  const reportsLayerConfig = createZikaReportsLayer({});
  const layerConfigs = [reportsLayerConfig, ...wmsLayerConfigs];

  layerConfigs.forEach(layerConfig => map.addLayer(layerConfig.layer));

  // -- DOM -- //
  createLayerToggles(layerConfigs);

  const dateRangeSearch = createDateRangeSearch({
    dates,
    handleSearch: updateFeaturesByDateRangeSearch({
      map,
      layer: reportsLayerConfig.layer,
    }),
  });

  const dateSelect = createDateSelect({
    dates,
    handleDateChange: updateFeaturesByDateChange({
      reportsByDateEndpoint,
      layer: reportsLayerConfig.layer,
    }),
  });

  const searchBox = createSearchBox({
    searchTerms,
    handleSearch: updateFeaturesBySearch({
      reportsBySearchEndpoint,
      layer: reportsLayerConfig.layer,
    }),
  });

  document
    .querySelector("#search-tools")
    .append(dateSelect, searchBox, dateRangeSearch);
});
