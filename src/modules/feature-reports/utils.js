import { createReportsTable, createReportRow } from "./components.js";

import {
  REPORTS_CONTAINER,
  REPORT_DATA_LABELS,
  REPORT_ELEMENT_IDS,
  REPORT_COLUMN_ATTRIBUTE,
} from "./constants.js";

export {
  shouldAddRow,
  getReportData,
  addReportDataRow,
  resetReportsTable,
  emptyReportsContainer,
};

// -- DOM UTILS -- //

const emptyReportsContainer = () => {
  REPORTS_CONTAINER.innerHTML = "";
};

const resetReportsTable = feature => {
  emptyReportsContainer();

  const reportsTable = createReportsTable(getReportData(feature));
  REPORTS_CONTAINER.appendChild(reportsTable);
};

// -- DOM-FEATURE INTERFACE UTILS --//

// setting the JSDoc param gives intellisense typing completion
// when working inside or calling the function
// hover over the function name to see!

/**
 * @param {ol.Feature} feature
 */
const getReportData = feature => {
  const { value, location } = feature.getProperties();

  const [country, rawLocality] = location.split("-");
  // if no locality use "National" as a default
  const locality = rawLocality ? rawLocality.replace(/_/g, " ") : "National";

  // use the report data constants to stay consistent
  // if more data is instroduced forces the constant to be updated
  return {
    country,
    [REPORT_DATA_LABELS.locality.property]: locality,
    [REPORT_DATA_LABELS.totalReports.property]: value,
  };
};

/**
 * @param {ol.Feature} feature
 */
const shouldAddRow = feature => {
  const countryHeader = document.querySelector(
    `#${REPORT_ELEMENT_IDS.reportsTableTitle}`,
  );
  if (!countryHeader) return false; // no table to append to

  const isSameCountry =
    countryHeader.textContent === getReportData(feature).country;

  return isSameCountry;
};

/**
 * Used to aggregate and update the total reports count when a duplicate locality is found
 * @param {string} locality locality of the feature
 * @param {number} totalReports reports count property of the feature
 */
const updateLocalityReportsCount = (localityRow, totalReports) => {
  // child element: column (by report data attribute
  const columnIdentifier = `${REPORT_COLUMN_ATTRIBUTE}="${REPORT_DATA_LABELS.totalReports.property}"`;

  const reportsCountColumn = localityRow.querySelector(
    `td[${columnIdentifier}]`,
  );

  const currentCount = Number(reportsCountColumn.textContent);
  // aggregate the count by summing
  reportsCountColumn.textContent = currentCount
    ? currentCount + totalReports
    : 0; // if there is no current count ensure its value is set as 0
};

/**
 * @param {ol.Feature} feature
 */
const addReportDataRow = feature => {
  const reportData = getReportData(feature);
  const locality = reportData[REPORT_DATA_LABELS.locality.property];
  const totalReports = reportData[REPORT_DATA_LABELS.totalReports.property];

  const localityRow = document.querySelector(`tr[locality="${locality}"]`);

  if (localityRow) {
    // exit early and update the report count for the locality
    return updateLocalityReportsCount(localityRow, totalReports);
  }

  // otherwise build and append a new row
  const reportRow = createReportRow(getReportData(feature));
  const reportsTable = document.querySelector(
    `#${REPORT_ELEMENT_IDS.reportsTable}`,
  );

  reportsTable.appendChild(reportRow);
};
