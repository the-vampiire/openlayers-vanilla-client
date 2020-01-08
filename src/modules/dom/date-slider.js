import { createElement } from "./utils.js";

// 24 hours in ms
const DATE_STEP_SIZE = 24 * 60 * 60 * 1000;

const createDateOption = date =>
  createElement({
    tag: "option",
    attributes: {
      label: date,
      value: date,
    },
  });

const createDatesDataList = dates =>
  createElement({
    tag: "datalist",
    id: "dates-datalist",
    children: dates.filter(createDateOption),
  });

const buildRangeConfig = dates => {
  const [firstDate] = dates;
  const lastDate = dates[dates.length - 1];
  const [min, max] = [firstDate, lastDate].map(date =>
    new Date(date).getTime(),
  );

  return { min, max, step: DATE_STEP_SIZE };
};

const createDateSlider = dates => {
  const rangeConfig = buildRangeConfig(dates);

  return createElement({
    tag: "input",
    attributes: {
      type: "range",
      id: "date-slider",
      attributes: {
        ...rangeConfig,
        list: "dates-datalist",
      },
    },
  });
};

export default config => {
  const { dates, handleDateRangeSearch } = config;

  return {
    dateSlider: createDateSlider(dates),
    datesDataList: createDatesDataList(dates),
  };
};
