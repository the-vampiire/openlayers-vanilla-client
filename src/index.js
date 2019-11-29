import buildEndpoint from "./api-utils.js";
import { createBaseLayer, createGeoJSONReportsLayer } from "./map-utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const map = new ol.Map({
    target: "map",
    view: new ol.View({
      zoom: 2,
      center: [0, 0],
    }),
    layers: [createBaseLayer()],
  });

  map.addLayer(createGeoJSONReportsLayer({ url: buildEndpoint("/reports") }));
});
