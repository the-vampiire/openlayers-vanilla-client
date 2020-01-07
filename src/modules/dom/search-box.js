import { createElement } from "./utils.js";
import { getSearchTerms } from "../api-utils.js";

const createSearchTermOption = searchTerm =>
  `<option value="${searchTerm}">${searchTerm}</option>`;

const createSearchTermSelect = async buildEndpoint => {
  const searchTerms = await getSearchTerms(buildEndpoint);

  return createElement({
    tag: "select",
    id: "search-term-select",
    children: searchTerms.map(createSearchTermOption),
  });
};

const createSearchBox = () =>
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

const createSearchBar = async config => {
  const { handleSearch, buildEndpoint } = config;

  return createElement({
    tag: "div",
    id: "search-bar",
    children: [
      await createSearchTermSelect(buildEndpoint),
      createSearchBox(),
      createSearchButton(handleSearch),
    ],
  });
};

export default async config => {
  const searchBar = await createSearchBar(config);

  document.querySelector("#search-tools").append(searchBar);
};
