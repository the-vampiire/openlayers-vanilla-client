import { getGeoserverFeatures } from "./geoserver.js";
import {
  createVectorSourceFromURL,
  createVectorSourceFromFeatures,
} from "./map-utils.js";

export const updateFeaturesByDateChange = config => event => {
  const { layer, reportsByDateEndpoint } = config;
  const reportsDate = event.target.value;

  const source = createVectorSourceFromURL({
    url: reportsByDateEndpoint(reportsDate),
  });

  layer.setSource(source);
};

export const updateFeaturesBySearch = config => (term, value) => {
  const { layer, reportsBySearchEndpoint } = config;

  const source = createVectorSourceFromURL({
    url: reportsBySearchEndpoint(term, value),
  });

  layer.setSource(source);
};

export const updateFeaturesByDateRangeSearch = config => async (
  startDate,
  endDate,
) => {
  const { map, layer } = config;

  const features = await getGeoserverFeatures({ startDate, endDate });
  const source = createVectorSourceFromFeatures({ features });

  layer.setSource(source);
  map.getView().fit(source.getExtent());
};
