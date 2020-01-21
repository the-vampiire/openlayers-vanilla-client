import { createElement } from "./utils.js";

const createZeroCasesOption = () => {
  const id = "zero-cases-checkbox";
  const zeroCasesCheckbox = createElement({
    id,
    tag: "input",
    attributes: {
      type: "checkbox",
    },
  });

  return createElement({
    children: [
      `<label for=${id}>Include Zero Cases</label>`,
      zeroCasesCheckbox,
    ],
  });
};

const dateSelectorCreator = (minDate, maxDate) => id =>
  createElement({
    id,
    tag: "input",
    attributes: {
      type: "date",
      min: minDate,
      max: maxDate,
      value: minDate,
    },
  });

const createSearchButton = handleClick =>
  createElement({
    tag: "button",
    children: "Load Date Range",
    events: {
      click: handleClick,
    },
  });

const handleSearchClick = handleSearch => () => {
  const startDate = document.querySelector("#date-range-start").value;
  const endDate = document.querySelector("#date-range-end").value;
  const includeZeroCases = document.querySelector("#zero-cases-checkbox")
    .checked;

  if (!startDate || !endDate) return;

  handleSearch({ startDate, endDate }, includeZeroCases);
};

const createDateRangeSearch = config => {
  const { dates, handleSearch } = config;

  const [minDate] = dates;
  const maxDate = dates[dates.length - 1];
  const createDateSelector = dateSelectorCreator(minDate, maxDate);

  return createElement({
    id: "date-range-search",
    children: [
      createZeroCasesOption(),
      createDateSelector("date-range-start"),
      createDateSelector("date-range-end"),
      createSearchButton(handleSearchClick(handleSearch)),
    ],
  });
};

export default createDateRangeSearch;
