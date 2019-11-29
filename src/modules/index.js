import { endpointBuilder } from "./api-utils.js";
import { displayFeatureReports } from "./event-handlers.js";
import { createBaseLayer, createGeoJSONReportsLayer } from "./map-utils.js";

const API_URL = "http://localhost:8080";
const buildEndpoint = endpointBuilder(API_URL);

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

  map.on("click", displayFeatureReports);
});
