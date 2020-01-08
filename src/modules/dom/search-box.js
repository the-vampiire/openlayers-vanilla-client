import { createElement } from "./utils.js";

const createSearchTermOption = searchTerm =>
  `<option value="${searchTerm}">${searchTerm}</option>`;

const createSearchTermSelect = searchTerms =>
  createElement({
    tag: "select",
    id: "search-term-select",
    children: searchTerms.map(createSearchTermOption),
  });

const createSearchInput = () =>
  createElement({
    tag: "input",
    id: "search-value-input",
    attributes: {
      type: "text",
    },
  });

const createSearchButton = handleSearch =>
  createElement({
    tag: "button",
    id: "search-button",
    children: "Search",
    events: {
      click: () => {
        const searchTerm = document.querySelector("#search-term-select").value;
        const searchValue = document.querySelector("#search-value-input").value;

        handleSearch(searchTerm, searchValue);
      },
    },
  });

const createSearchBox = config => {
  const { searchTerms, handleSearch } = config;

  return createElement({
    tag: "div",
    id: "search-bar",
    children: [
      createSearchTermSelect(searchTerms),
      createSearchInput(),
      createSearchButton(handleSearch),
    ],
  });
};

export default createSearchBox;
