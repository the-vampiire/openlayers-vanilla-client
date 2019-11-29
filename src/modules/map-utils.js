const createVectorLayer = ({ url, style, format }) =>
  new ol.layer.Vector({
    style,
    source: new ol.source.Vector({ url, format }),
  });

const createCircleStyle = ({
  color,
  stroke,
  radius,
  fill = new ol.style.Fill({ color }),
}) =>
  new ol.style.Style({
    image: new ol.style.Circle({
      fill,
      radius,
      stroke,
    }),
  });

export const createBaseLayer = (source = new ol.source.OSM()) =>
  new ol.layer.Tile({ source });

export const createGeoJSONReportsLayer = ({
  url,
  style = createCircleStyle({
    color: "red",
    radius: 2,
  }),
}) =>
  createVectorLayer({
    url,
    style,
    format: new ol.format.GeoJSON(),
  });

/**
 *
 * @param {ol.Map} map
 */
export const displayReports = map => feature => {
  const reportOverlay = createReportsOverlay(feature);
  map.addOverlay(reportOverlay);
};

export const createReportsOverlay = feature => {
  const overlay = new ol.Overlay({ ele });
};
