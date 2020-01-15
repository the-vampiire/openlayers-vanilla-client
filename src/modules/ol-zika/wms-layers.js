import { createLayerVisibilityToggle } from "./map-utils.js";

const wmsLayerCreator = map => (url, LAYERS) =>
  new ol.layer.Image({
    map,
    opacity: 0.5,
    visible: false,
    source: new ol.source.ImageWMS({
      url,
      params: { LAYERS },
      projection: "EPSG:3857",
    }),
  });

export default map => {
  const createWMSLayer = wmsLayerCreator(map);

  const populationDensity2015Layer = createWMSLayer(
    "https://sedac.ciesin.columbia.edu/geoserver/wms",
    [
      "gpw-v4:gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals-rev11_2015",
    ],
  );

  const daySurfaceTemp2013Layer = createWMSLayer(
    "https://sedac.ciesin.columbia.edu/geoserver/wms",
    ["sdei:sdei-global-summer-lst-2013_day-max-global"],
  );

  const freshwaterAvailabilityLayer = createWMSLayer(
    "https://sedac.ciesin.columbia.edu/geoserver/wms",
    ["sdei:sdei-trends-freshwater-availability-grace"],
  );

  return [
    {
      layer: populationDensity2015Layer,
      name: "Population Density [2015]",
      toggleVisibility: createLayerVisibilityToggle(populationDensity2015Layer),
    },
    {
      layer: daySurfaceTemp2013Layer,
      name: "Daytime Surface Temperature [2013]",
      toggleVisibility: createLayerVisibilityToggle(daySurfaceTemp2013Layer),
    },
    {
      layer: freshwaterAvailabilityLayer,
      name: "Freshwater Availability [2002-16]",
      toggleVisibility: createLayerVisibilityToggle(
        freshwaterAvailabilityLayer,
      ),
    },
  ];
};
