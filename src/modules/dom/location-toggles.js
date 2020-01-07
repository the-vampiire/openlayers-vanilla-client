import { createElement } from "./utils.js";

const LOCATION_TOGGLES = document.querySelector("#location-toggles");

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
    tag: "div",
    children: [
      {
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
            const style = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: target.checked ? [255, 0, 0] : [0, 0, 0, 0],
              }),
            });

            locationFeature.setStyle(style);
          },
        },
      },
      `<label for="${id}">${location}</label>`,
    ],
  });

  return locationToggle;
};

export default locationFeatures => {
  const locationToggles = createElement({
    tag: "div",
    id: "location-toggle-options",
    children: locationFeatures.map(createLocationToggle),
  });

  LOCATION_TOGGLES.innerHTML = "";
  LOCATION_TOGGLES.appendChild(locationToggles);
};
