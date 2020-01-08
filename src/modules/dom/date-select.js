import { createElement } from "./utils.js";

const createDateOption = date =>
  createElement({
    tag: "option",
    attributes: {
      value: date,
    },
    children: date,
  });

const createDateSelect = config => {
  const { dates, handleDateChange } = config;

  return createElement({
    tag: "select",
    events: {
      change: handleDateChange,
    },
    children: [createDateOption("Select a Date")].concat(
      dates.map(createDateOption),
    ),
  });
};

export default createDateSelect;
