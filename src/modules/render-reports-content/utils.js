export {
  shouldAppendRow,
  addReportDataRow,
  emptyReportsContainer,
  resetReportsContent,
};

const REPORTS_CONTAINER = document.querySelector("#reports");

const REPORTS_TABLE_HEADERS = {
  locality: "Locality",
  reportsCount: "Total Reports",
};

const emptyReportsContainer = () => {
  REPORTS_CONTAINER.innerHTML = "";
};

const resetReportsContent = feature => {
  emptyReportsContainer();
  REPORTS_CONTAINER.appendChild(createReportsContent(feature));
};

const convertToElement = rawHTML => {
  // remove newlines and 2+ spaces from template strings
  const cleanedHTML = rawHTML.replace(/\n|\s{2,}/g, "");

  const template = document.createElement("template");
  template.innerHTML = cleanedHTML;

  return template.content.firstChild;
};

const getReportTableHeaders = () => Object.values(REPORTS_TABLE_HEADERS);

const getReportData = feature => {
  const { value, location } = feature.getProperties();

  const [country, rawLocality] = location.split("-");
  const locality = rawLocality ? rawLocality.replace(/_/g, " ") : "National";

  return { value, country, locality };
};

/**
 * @param {ol.Feature} feature
 */
const shouldAppendRow = feature => {
  const reportsContent = REPORTS_CONTAINER.firstChild;
  if (!reportsContent) return false;

  const countryHeader = reportsContent.firstChild;

  return countryHeader.textContent.includes(getReportData(feature).country);
};

const updateLocalityCount = (locality, reportsCount) => {
  const reportsCountAttribute = REPORTS_TABLE_HEADERS.reportsCount.toLowerCase();

  const localityReportsCountColumn = document.querySelector(
    `tr[locality="${locality}"]>td[attribute="${reportsCountAttribute}"]`,
  );

  const currentCount = Number(localityReportsCountColumn.textContent);

  localityReportsCountColumn.textContent = currentCount
    ? currentCount + reportsCount
    : 0;
};

const buildHeader = (content, size = 2) => `<h${size}>${content}</h${size}>`;

const buildReportColumns = columnValues => {
  const reportHeaders = getReportTableHeaders();

  return columnValues
    .map((columnValue, index) => {
      const reportAttribute = reportHeaders[index].toLowerCase();

      return `<td attribute="${reportAttribute}">${columnValue}</td>`;
    })
    .join("");
};

const buildReportRow = columnValues => {
  const [locality] = columnValues;

  return `
    <tr locality="${locality}">
      ${buildReportColumns(columnValues)}
    <tr>
  `;
};

const buildReportRows = rows => rows.map(buildReportRow);

const buildReportTable = rows => {
  const reportHeaders = getReportTableHeaders();

  return `
    <table id="report-table" class="text-center">
      <tr>
        ${reportHeaders.map(header => `<th>${header}</th>`).join("")}
      </tr>
      ${rows.length ? buildReportRows(rows) : ""}
    </table>
  `;
};

const appendTableRow = (table, row) => {
  const reportRowElement = convertToElement(buildReportRow(row));

  table.appendChild(reportRowElement);
};

const addReportDataRow = feature => {
  const { locality, value } = getReportData(feature);

  const localityRow = document.querySelector(`tr[locality="${locality}"`);

  if (localityRow) {
    updateLocalityCount(locality, value);
  } else {
    const reportTable = document.querySelector("#report-table");
    appendTableRow(reportTable, [locality, value]);
  }
};

const createReportsContent = feature => {
  const { country, locality, value } = getReportData(feature);

  return convertToElement(
    `
    <div>
      ${buildHeader(country)}
      ${buildReportTable([[locality, value]])}  
    </div>  
  `,
  );
};
