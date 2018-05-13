/**
 * HomemadeComponent tries to be React.Component in some ways.
 *
 * @link https://reactjs.org/docs/react-component.html
 * @link https://reactjs.org/docs/react-component.html#constructor
 * @link https://reactjs.org/docs/react-component.html#componentdidmount
 * @link https://reactjs.org/docs/react-component.html#componentdidupdate
 * @link https://reactjs.org/docs/react-component.html#setstate
 */
class HomemadeComponent {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  componentDidMount() {}
  componentDidUpdate() {}

  setState(updater, doneUpdating = () => {}) {
    setTimeout(() => {
      this.state = Object.assign({}, this.state, updater);
      HomemadeReactDOM.update(this);
      doneUpdating();
      this.componentDidUpdate();
    }, 0);
  }
}

/**
 * HomemadeReactDOM tries to be like ReactDOM in some ways
 * @link https://reactjs.org/docs/react-dom.html
 */
var HomemadeReactDOM = { componentCache: [] };

/**
 * HomemadeReactDOM.render takes a component class (not an instance, so don't
 * "new" it) and an HTMLElement which the component should be mounted on to.
 *
 * @param {HomemadeComponent} componentClass
 * @param {object} props initial prop values
 * @param {HTMLElement} componentClass
 *
 * @param {HomemadeComponent} componentClass
 * @param {HTMLElement} componentClass
 */
HomemadeReactDOM.render = (componentClass, props, parent) => {
  if (!parent) {
    parent = props;
    props = {};
  }

  var component = new componentClass(props);
  HomemadeReactDOM.componentCache.push({ component, parent });
  HomemadeReactDOM.update(component);
  component.componentDidMount();
};

/**
 * HomemadeReactDOM.update is a helper function that knowns how to take an
 * instance of a component and update the right DOM element where the component
 * is mounted. It returns false if no update was done.
 *
 * @param {HomemadeReactDOM} component
 * @return {boolean}
 */
HomemadeReactDOM.update = component => {
  for (var i = 0, len = HomemadeReactDOM.componentCache.length; i < len; i++) {
    if (HomemadeReactDOM.componentCache[i].component === component) {
      HomemadeReactDOM.componentCache[i].parent.innerHTML = component.render();
      return true;
    }
  }

  return false;
};

/**
 * @param {string} tag name
 * @param {object} attr key/value pair of attributes and their values
 * @param {array<string>} children
 * @return {string} html string prepresentation of element
 */
const h = (tag, attrs = {}, children = []) =>
  `<${tag} ${htmlAttrs(attrs)}>${children.join("")}</${tag}>`;

/**
 * htmlAttrs is a function that takes an object and turns in into a string that
 * looks like HTML attributes.
 *
 * @param {object} attrs
 * @return {string}
 */
htmlAttrs = attrs =>
  foldo([], (acc, val, key) => acc.push(`${key}=${val}`), attrs)
    .join(" ");

/**
 * foldo is fold for objects
 *
 * @param {any} id is the identity value
 * @param {function} f is a function that takes an accumulator, a key's value,
 *                   and the actual key for arguments. Whatever it returns is
 *                   used as the next accumulator value.
 * @param {object} obj is the object value that we're folding over.
 * @return {any}
 */
foldo = (id, f, obj) =>
  Object.keys(obj)
    .reduce((acc, key) => f(acc, obj[key], key), id);
