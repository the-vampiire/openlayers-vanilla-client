export {
  REPORTS_CONTAINER,
  REPORT_ELEMENT_IDS,
  REPORT_DATA_LABELS,
  REPORT_COLUMN_ATTRIBUTE,
};

/**
 * SOURCES OF TRUTH
 *
 * for consistency across all functions that rely on these values
 * any changes can be made in here and will be reflected in the functions
 * that use them without any other modification
 */

// only needs to be selected once (hard coded in HTML)
const REPORTS_CONTAINER = document.querySelector("#reports-container");

// constant for the attribute name to identify report data column elements in CSS selectors
const REPORT_COLUMN_ATTRIBUTE = "report-property";

// constant for identifying the elements in CSS selectors
const REPORT_ELEMENT_IDS = {
  reportsTable: "reports-table",
  reportsTableTitle: "reports-country",
};

// constant for using feature report data
// for the feature properties and table columns to be displayed
const REPORT_DATA_LABELS = {
  locality: {
    property: "locality", // used for feature data property naming
    tableHeader: "Locality", // for table header values
  },
  totalReports: {
    property: "totalReports",
    tableHeader: "Total Reports",
  },
};
