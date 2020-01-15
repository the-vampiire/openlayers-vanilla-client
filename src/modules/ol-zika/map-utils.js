import calculatedFeatureStyle from "./feature-style.js";
import createLocationToggles from "../dom/location-toggles.js";

/**
 * Creates a function that toggles the visibility of a layer
 * @param {ol.layer.Image} layer
 */
export const createLayerVisibilityToggle = layer => () =>
  layer.setVisible(!layer.getVisible());

export const createVectorSourceFromURL = config => {
  const { url } = config;

  const vectorSource = new ol.source.Vector({
    url,
    format: new ol.format.GeoJSON(),
  });

  vectorSource.once("change", () => {
    if (vectorSource.getState() === "ready") {
      createLocationToggles(vectorSource.getFeatures());
    }
  });

  return vectorSource;
};

export const createVectorSourceFromFeatures = config => {
  const { features } = config;

  const vectorSource = new ol.source.Vector({
    features,
    format: new ol.format.GeoJSON(),
  });

  // TODO: aggregate when many dates are present
  // currently drawing multiple styles for each date
  createLocationToggles(vectorSource.getFeatures());

  return vectorSource;
};

const createBaseLayer = (source = new ol.source.OSM()) =>
  new ol.layer.Tile({ source });

export const createZikaMap = ({
  zoom = 3,
  layers = [createBaseLayer()],
  center = ol.proj.fromLonLat([-74.063644, 4.624335]),
} = {}) =>
  new ol.Map({
    target: "map",
    view: new ol.View({
      zoom,
      center,
      projection: "EPSG:3857",
    }),
    layers,
  });

export const createZikaReportsLayer = () => {
  const layer = new ol.layer.Vector({
    zIndex: 10, // keep as top layer at all times
    style: calculatedFeatureStyle,
  });

  return {
    layer,
    name: "Zika Reports [2015-18]",
    toggleVisibility: createLayerVisibilityToggle(layer),
  };
};
