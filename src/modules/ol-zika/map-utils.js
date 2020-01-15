import calculatedFeatureStyle from "./feature-style.js";
import createLocationToggles from "../dom/location-toggles.js";

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
      // projection: "EPSG:4326",
      projection: "EPSG:3857",
    }),
    layers,
  });

export const createGeoJSONReportsLayer = ({
  url,
  style = calculatedFeatureStyle,
}) =>
  new ol.layer.Vector({
    style,
    source: new ol.source.Vector({ url, format: new ol.format.GeoJSON() }),
  });

/**
 * Creates a function that toggles the visibility of a layer
 * @param {ol.layer.Image} layer
 */
export const createLayerToggle = layer => () =>
  layer.setVisible(!layer.getVisible());
