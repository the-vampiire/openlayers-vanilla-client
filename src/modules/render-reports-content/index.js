import {
  shouldAppendRow,
  addReportDataRow,
  resetReportsContent,
} from "./utils.js";

/**
 * Renders the Report data associated with a Feature
 * - renders in div#reports
 * @param {ol.Feature} feature
 */
export default feature => {
  if (shouldAppendRow(feature)) {
    addReportDataRow(feature);
  } else {
    resetReportsContent(feature);
  }
};

export { emptyReportsContainer } from "./utils.js";
