import { createElement } from "./utils.js";
import { getDatesList } from "../api-utils.js";

const createDateOption = date =>
  createElement({
    tag: "option",
    attributes: {
      value: date,
    },
    children: date,
  });

const createDateSelect = async config => {
  const { buildEndpoint, handleDateChange } = config;

  const dates = await getDatesList(buildEndpoint);

  return createElement({
    tag: "select",
    attributes: {
      id: "date-select",
    },
    events: {
      change: handleDateChange,
    },
    children: [createDateOption("Select a Date")].concat(
      dates.map(createDateOption),
    ),
  });
};

export default async config => {
  const dateSelect = await createDateSelect(config);

  document.querySelector("#search-tools").appendChild(dateSelect);
};
