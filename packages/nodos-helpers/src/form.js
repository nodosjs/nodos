import tag from './tags';

export const textFieldTag = (name = null, value = null, options = {}) => {
  const config = {
    name: 'input',
    attributes: {
      id: name, name, type: 'text', value, ...options,
    },
  };
  const result = tag(config);
  return result;
};

export const labelTag = (name = 'title', content = 'Title', options = {}) => {
  const config = {
    name: 'label',
    attributes: {
      for: name, ...options,
    },
    text: content,
  };
  const result = tag(config);
  return result;
};
