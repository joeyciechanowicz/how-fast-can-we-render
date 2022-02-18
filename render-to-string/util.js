// DOM properties that should NOT have "px" added when numeric
const IS_NON_DIMENSIONAL =
  /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

const ENCODED_ENTITIES = /[&<>"]/;

function encodeEntities(input) {
  const s = String(input);
  if (!ENCODED_ENTITIES.test(s)) {
    return s;
  }
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const JS_TO_CSS = {};

// Convert an Object style to a CSSText string
function styleObjToCss(s) {
  let str = '';
  for (let prop in s) {
    let val = s[prop];
    if (val != null && val !== '') {
      if (str) str += ' ';
      // str += jsToCss(prop);
      str +=
        prop[0] == '-'
          ? prop
          : JS_TO_CSS[prop] ||
            (JS_TO_CSS[prop] = prop.replace(/([A-Z])/g, '-$1').toLowerCase());
      str += ': ';
      str += val;
      if (typeof val === 'number' && IS_NON_DIMENSIONAL.test(prop) === false) {
        str += 'px';
      }
      str += ';';
    }
  }
  return str || undefined;
}

/**
 * Copy all properties from `props` onto `obj`.
 * @param {object} obj Object onto which properties should be copied.
 * @param {object} props Object from which to copy properties.
 * @returns {object}
 * @private
 */
function assign(obj, props) {
  for (let i in props) obj[i] = props[i];
  return obj;
}

/**
 * Get flattened children from the children prop
 * @param {Array} accumulator
 * @param {any} children A `props.children` opaque object.
 * @returns {Array} accumulator
 * @private
 */
function getChildren(accumulator, children) {
  if (Array.isArray(children)) {
    children.reduce(getChildren, accumulator);
  } else if (children != null && children !== false) {
    accumulator.push(children);
  }
  return accumulator;
}

module.exports = {
  encodeEntities,
  styleObjToCss,
  assign,
  getChildren,
};
