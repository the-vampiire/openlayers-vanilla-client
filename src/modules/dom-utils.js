export { createElement, createNodeListFromHTML };

/**
 * @typedef CreateElementConfig - configuration for a new HTML element
 * @property {!string} [tag="div"] a valid HTML tag name
 * @property {!string | !string[]} [classes=[]] classes to apply to the element
 * - a single space separated string or array of individual class strings
 * @property {{ ...attribute: string }} [attributes={}] attributes to apply to the element
 * - in { attribute: value, ... } format
 * @property {string | !Array.<string | CreateElementConfig | HTMLElement | Text | NodeList>} [children=[]] appended to the new element
 *
 * can be a single plain text or HTML string or an array with any mixture of:
 * - HTML strings
 * - plain text strings
 * - DOM element objects
 * - NodeList of DOM element objects
 * - element configuration objects
 */

/**
 * @param {CreateElementConfig} config - the HTML element configuration
 * @returns {HTMLElement} new element
 * @description
 *  * Creates an HTMLElement DOM Node from a configuration object
 * - sets classes
 * - sets attributes
 * - converts (as applicable) and appends children to the created element
 * 
 * Complex Example (children is a list of mixed formats)
 *
 * ```js
 * const title = "My Container Title";
 * const sectionTitle = "My Section Title";
 * const sectionContent = "Section content...";
 *
 * // note any node that is already attached to the DOM will be moved
 * // as children to the new element
 * const table = document.querySelector("#table-id");
 * const paragraphs = document.querySelectorAll("p");
 *
 * // these elements are unattached (since they were just created)
 * const newDiv = document.createElement('div');
 * newDiv.textContent = "new div content";
 *
 * const textNode = document.createTextNode("Text Node of plain text");
 *
 * const config = {
 *   tag: "div",
 *   classes: ["text-center", "container", "grid"],
 *   attributes: {
 *    id: "main-grid",
 *    customAttribute: "custom value",
 *   },
 *   children: [
 *      `<h1>${title}</h1>`, // an HTML string
 *      "some plain text", // plain text string
 *      table, // an attached DOM element (HTMLElement)
 *      newDiv, // an unattached DOM element (HTMLElement)
 *      textNode, // an unattached DOM element (TextNode)
 *      { // a config object
 *        tag: "section",
 *        attributes: {
 *          id: "section-1",
 *        },
 *        children: [
 *          `<h2>${sectionTitle}</h2>`,
 *          `<p>${sectionContent}</p>`,
 *          paragraphs, // an attached list of DOM elements (NodeList)
 *        ],
 *      },
 *   ],
 * };
 *
 * const containerNode = createElement(config);
 * document.body.appendChild(containerNode);
 * 
 * // previous HTML
 * <body>
 *  <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
*   <table id="table-id">
      <thead>
        <tr>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title content</td>
        </tr>
      </tbody>
    </table>
 * </body>
 * 
 * // resulting HTML
 * <body>
  * <div
      class="text-center container grid"
      id="main-grid"
      customattribute="custom value"
    >
      <h1>My Container Title</h1>
      some plain text
      <table id="table-id">
        <thead>
          <tr>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title content</td>
          </tr>
        </tbody>
      </table>
      <div>new div content</div>
      Text Node of plain text
      <section class="" id="section-1">
        <h2>My Section Title</h2>
        <p>Section content...</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </section>
    </div>
  </body>
 * ```
 */
const createElement = config => {
  const { tag = "div", classes = [], children = [], attributes = {} } = config;

  const element = document.createElement(tag);

  element.classList.add(
    ...(Array.isArray(classes) ? classes : classes.split(" ")),
  );

  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value);
  }

  if (Array.isArray(children)) {
    // children is a mixed Array
    // loop to convert and append all children
    for (const child of children) {
      const childList = convertChildToSpreadableList(child);
      element.append(...childList);
    }

    return element;
  }

  // otherwise children is a single child
  // a string (plain / HTML) or DOM Node (HTMLElement, Text)
  const childList = convertChildToSpreadableList(children);
  element.append(...childList);

  return element;
};

/**
 * Creates a NodeList from an HTML string
 * @param {string} rawHTMLString string of HTML element(s)
 * - whitespace characters are trimmed internally
 * @returns {NodeList} a NodeList with the converted elements
 * @example
 * // use a template string
 * // write naturally with new lines and indendations
 * // inject variables / expressions using ${} syntax
 * const myHTMLString = `
 *  <h1>My Header for ${title}</h1>
 *
 *  <div id="${containerId}">
 *    <p id="child">${paragraphContent}</p>
 *  </div>
 * `;
 *
 * const nodes = createNodeListFromHTML(myHTMLString);
 * // nodes: NodeList[#h1, #div]
 * // div.children: NodeList[#p]
 */
const createNodeListFromHTML = rawHTMLString => {
  // remove newlines, tabs and spaces (2+) from multi-line / indented template strings
  const cleanedHTML = rawHTMLString.replace(/\n|\t|\s{2,}/g, "");

  const template = document.createElement("template");
  template.innerHTML = cleanedHTML;

  return template.content.childNodes;
};

const isDOMNode = object =>
  [HTMLElement, Text].some(domNodeType => object instanceof domNodeType);

const convertChildToSpreadableList = child => {
  if (typeof child === "string") {
    return /<([a-z0-9]+?)>/.test(child) // test for HTML tag presence
      ? createNodeListFromHTML(child) // NodeList ready for spreading
      : [child]; // plain text (in array for spreading)
  }

  if (isDOMNode(child)) {
    // child is a single HTMLElement or Text node
    return [child]; // (in array for spreading)
  }

  if (child instanceof NodeList) {
    // child is a NodeList ready for spreading
    return child;
  }

  return [createElement(child)]; // create from config (in array for spreading)
};
