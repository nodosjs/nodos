import createHtmlElement from 'create-html-element';

const tag = (config) => {
  const string = createHtmlElement(config);
  return string;
};

export default tag;
