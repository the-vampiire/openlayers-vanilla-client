import { createLayerVisibilityToggle } from "./map-utils.js";

const createWMSLayer = ({ url, layers, projection = "EPSG:3857" }) =>
  new ol.layer.Image({
    visible: false,
    source: new ol.source.ImageWMS({
      url,
      projection,
      params: { layers },
    }),
  });

export default () => {
  const populationDensity2015Layer = createWMSLayer({
    url: "https://sedac.ciesin.columbia.edu/geoserver/wms",
    layers: [
      "gpw-v4:gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals-rev11_2015",
    ],
  });

  const daySurfaceTemp2013Layer = createWMSLayer({
    url: "https://sedac.ciesin.columbia.edu/geoserver/wms",
    layers: ["sdei:sdei-global-summer-lst-2013_day-max-global"],
  });

  const freshwaterAvailabilityLayer = createWMSLayer({
    url: "https://sedac.ciesin.columbia.edu/geoserver/wms",
    layers: ["sdei:sdei-trends-freshwater-availability-grace"],
  });

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
