import { shouldAddRow, addReportDataRow, resetReportsTable } from "./utils.js";

export { renderFeatureReports };
export { emptyReportsContainer } from "./utils.js";

/**
 * Renders the Report data associated with a Feature
 * - renders in reports container (selected in constants.js)
 * @param {ol.Feature} feature
 */
const renderFeatureReports = feature => {
  if (shouldAddRow(feature)) {
    addReportDataRow(feature);
  } else {
    resetReportsTable(feature);
  }
};
