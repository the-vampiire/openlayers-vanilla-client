const createVectorLayer = ({ url, style, format }) =>
  new ol.layer.Vector({
    style,
    source: new ol.source.Vector({ url, format }),
  });

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
      projection: "EPSG:4326",
    }),
    layers,
  });

export const createGeoJSONReportsLayer = ({
  url,
  style = ol.style.Stroke({
    stroke: "red",
  }),
}) =>
  createVectorLayer({
    url,
    style,
    format: new ol.format.GeoJSON(),
  });
