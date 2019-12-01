import {
  renderFeatureReports,
  emptyReportsContainer,
} from "./feature-reports/index.js";

/**
 * Map click handler
 * @param {ol.MapBrowserEvent} mapClickEvent
 */
export const displayFeatureReports = mapClickEvent => {
  const { map, pixel } = mapClickEvent;

  if (map.hasFeatureAtPixel(pixel)) {
    emptyReportsContainer();
    map.forEachFeatureAtPixel(pixel, renderFeatureReports);
  }
};
