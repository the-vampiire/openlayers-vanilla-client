import { createElement } from "../dom-utils.js";

import {
  REPORT_ELEMENT_IDS,
  REPORT_DATA_LABELS,
  REPORT_COLUMN_ATTRIBUTE,
} from "./constants.js";

export { createReportsTable, createReportRow };

const createReportsTableTitle = reportData => {
  const { country } = reportData;

  const config = {
    tag: "h2",
    attributes: {
      id: REPORT_ELEMENT_IDS.reportsTableTitle,
    },
    children: country,
  };

  return createElement(config);
};

const createReportsTableHeaders = () => {
  const tableHeaders = Object.values(REPORT_DATA_LABELS).map(
    label => `<th>${label.tableHeader}</th>`,
  );

  const config = {
    tag: "tr",
    children: tableHeaders,
  };

  return createElement(config);
};

const createReportColumns = reportData => {
  // use the report data labels to limit which properties are accessed
  return Object.values(REPORT_DATA_LABELS).map(dataLabel => {
    const dataProperty = dataLabel.property; // get the constant property name
    const dataValue = reportData[dataProperty]; // get the value of the property

    const config = {
      tag: "td",
      attributes: {
        // use sources of truth for consistency with other functions
        // attribute name and property name (from data labels constant)
        [REPORT_COLUMN_ATTRIBUTE]: dataProperty,
      },
      // ensure only strings are sent to createElement
      children: `${dataValue}`, // some data values are numeric
    };

    return createElement(config);
  });
};

const createReportRow = reportData => {
  const { locality } = reportData;

  const config = {
    tag: "tr",
    attributes: {
      locality,
    },
    children: createReportColumns(reportData),
  };

  return createElement(config);
};

const createReportsTable = reportData => {
  const config = {
    tag: "table",
    classes: "text-center",
    attributes: {
      id: REPORT_ELEMENT_IDS.reportsTable,
    },
    children: [
      createReportsTableTitle(reportData),
      createReportsTableHeaders(),
      createReportRow(reportData),
    ],
  };

  return createElement(config);
};
