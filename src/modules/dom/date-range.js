import { createElement } from "./utils.js";

const createDateSelector = (minDate, maxDate) => id =>
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

  if (!startDate && !endDate) return;

  handleSearch(startDate, endDate);
};

const createDateRangeSearch = config => {
  const { dates, handleSearch } = config;

  const [minDate] = dates;
  const maxDate = dates[dates.length - 1];

  const dateSelectorCreator = createDateSelector(minDate, maxDate);

  return createElement({
    id: "date-range-search",
    children: [
      dateSelectorCreator("date-range-start"),
      dateSelectorCreator("date-range-end"),
      createSearchButton(handleSearchClick(handleSearch)),
    ],
  });
};

export default createDateRangeSearch;
