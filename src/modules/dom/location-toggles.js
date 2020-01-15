import { createElement } from "./utils.js";
import { sortFeaturesByCount } from "../ol-zika/data-utils.js";
import calculatedFeatureStyle, {
  invisibleFeatureStyle,
} from "../ol-zika/feature-style.js";

const TOGGLES_CONTAINER = document.querySelector("#toggles-container");

const buildLocationFeatureId = (idPrefix, locationFeature) => {
  const { country, state } = locationFeature.getProperties();

  return `${idPrefix}-${country}-${state}`;
};

/**
 *
 * @param {ol.Feature} locationFeature
 */
const buildLocationTitle = locationFeature => {
  const { country, state } = locationFeature.getProperties();

  return `${state}, ${country}`;
};

const buildCountInfoString = locationFeature => {
  const { cases, reports } = locationFeature.getProperties();

  const infoString = reports ? `${reports.length} reports` : `${cases} cases`;

  return `<span class="count-info-string">${infoString}</span>`;
};

/**
 *
 * @param {ol.Feature} locationFeature
 */
const createLocationToggle = locationFeature => {
  const location = buildLocationTitle(locationFeature);
  const id = buildLocationFeatureId("location-toggle", locationFeature);

  const countInfoString = buildCountInfoString(locationFeature);

  const locationToggle = createElement({
    id,
    tag: "input",
    attributes: {
      checked: true,
      name: location,
      type: "checkbox",
    },
    events: {
      change: event => {
        const { target } = event;

        const style = target.checked
          ? calculatedFeatureStyle(locationFeature)
          : invisibleFeatureStyle();

        locationFeature.setStyle(style);
      },
    },
  });

  return createElement({
    tag: "div",
    children: [
      locationToggle,
      `<label for=${id}>${location}: ${countInfoString}</label>`,
    ],
  });
};

const convertToCountryToggles = countryGroups =>
  Object.entries(countryGroups).map(countryGroupEntry => {
    const [country, features] = countryGroupEntry;

    // sort by cases / reports count
    features.sort(sortFeaturesByCount);

    // convert to HTML toggle elements
    const locationToggles = features.map(createLocationToggle);

    return createElement({
      id: `${country}-location-toggles`,
      children: [`<h3>${country}</h3>`, ...locationToggles],
    });
  });

const createCountryLocationToggles = locationFeatures =>
  locationFeatures.reduce((countryGroups, locationFeature, index) => {
    const { country } = locationFeature.getProperties();

    // use existing group or create a new array group for the country toggles
    countryGroups[country] = countryGroups[country] || [];

    // push a location toggle for the feature belonging to the country
    // countryGroups[country].push(createLocationToggle(locationFeature));
    countryGroups[country].push(locationFeature);

    return index !== locationFeatures.length - 1
      ? // until the last element continue to accumulate the location toggles by country
        countryGroups
      : // on the final element convert the country groups to HTML elements
        convertToCountryToggles(countryGroups);
  }, {});

export default locationFeatures => {
  const countryLocationToggles = createCountryLocationToggles(locationFeatures);

  const locationToggles = createElement({
    tag: "div",
    id: "location-toggles",
    children: ["<h2>Toggle Locations</h2>", ...countryLocationToggles],
  });

  TOGGLES_CONTAINER.innerHTML = "";
  TOGGLES_CONTAINER.appendChild(locationToggles);
};
