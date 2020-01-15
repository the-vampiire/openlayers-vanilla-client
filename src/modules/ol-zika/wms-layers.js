import { createLayerToggle } from "./map-utils.js";

const wmsLayerCreator = map => (url, LAYERS) =>
  new ol.layer.Image({
    map,
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

  const nightSurfaceTemp2013Layer = createWMSLayer(
    "https://sedac.ciesin.columbia.edu/geoserver/wms",
    ["sdei:sdei-global-summer-lst-2013_night-min-global"],
  );

  const freshwaterAvailabilityLayer = createWMSLayer(
    "https://sedac.ciesin.columbia.edu/geoserver/wms",
    ["sdei:sdei-trends-freshwater-availability-grace"],
  );

  return [
    {
      layer: populationDensity2015Layer,
      name: "Population Density (2015)",
      toggleVisibility: createLayerToggle(populationDensity2015Layer),
    },
    {
      layer: daySurfaceTemp2013Layer,
      name: "Surface Temperature 2013 [day]",
      toggleVisibility: createLayerToggle(daySurfaceTemp2013Layer),
    },
    {
      layer: nightSurfaceTemp2013Layer,
      name: "Surface Temperature 2013 [night]",
      toggleVisibility: createLayerToggle(nightSurfaceTemp2013Layer),
    },
    {
      layer: freshwaterAvailabilityLayer,
      name: "Freshwater Availability 2002-16",
      toggleVisibility: createLayerToggle(freshwaterAvailabilityLayer),
    },
  ];
};
