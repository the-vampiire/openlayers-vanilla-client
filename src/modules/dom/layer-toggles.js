import { createElement } from "./utils.js";

const LAYER_TOGGLES = document.querySelector("#layer-toggles");

const createLayerToggle = layerConfig => {
  const { name, layer, toggleVisibility } = layerConfig;

  const id = `${name}-layer-toggle`;
  const attributes = {
    name,
    type: "checkbox",
  };

  if (layer.getVisible()) attributes.checked = true;

  const layerToggle = createElement({
    id,
    attributes,
    tag: "input",
    events: {
      change: () => toggleVisibility(),
    },
  });

  return createElement({
    tag: "div",
    children: [layerToggle, `<label for=${id}>${name}</label>`],
  });
};

export default layerConfigs => {
  const layerToggles = layerConfigs.map(createLayerToggle);

  LAYER_TOGGLES.append(
    createElement({
      children: ["<h2>Toggle Layers</h2>", ...layerToggles],
    }),
  );
};
