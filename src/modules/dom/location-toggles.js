import { createElement } from "./utils.js";
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

/**
 *
 * @param {ol.Feature} locationFeature
 */
const createLocationToggle = locationFeature => {
  const location = buildLocationTitle(locationFeature);
  const id = buildLocationFeatureId("location-toggle", locationFeature);

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
    children: [locationToggle, `<label for=${id}>${location}</label>`],
  });
};

export default locationFeatures => {
  const locationToggles = createElement({
    tag: "div",
    id: "location-toggles",
    children: [
      "<h2>Toggle Locations</h2>",
      ...locationFeatures.map(createLocationToggle),
    ],
  });

  TOGGLES_CONTAINER.innerHTML = "";
  TOGGLES_CONTAINER.appendChild(locationToggles);
};
