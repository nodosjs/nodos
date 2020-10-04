import tag from './tags';

export const textFieldTag = (name = null, value = '', options = {}) => {
  const config = {
    name: 'input',
    attributes: {
      id: name,
      name,
      type: 'text',
      value,
      ...options,
    },
  };
  const result = tag(config);
  return result;
};

export const labelTag = (name = 'title', content = 'Title', options = {}) => {
  const config = {
    name: 'label',
    attributes: {
      for: name,
      ...options,
    },
    text: content,
  };
  const result = tag(config);
  return result;
};

export const submitTag = (value = 'Save changes', options = {}) => {
  const { data, ...rest } = options;
  const newData = data && Object.keys(data).reduce((acc, key) => {
    const newAcc = { ...acc, [`data-${key}`]: data[key] };
    return newAcc;
  }, {});
  const config = {
    name: 'input',
    attributes: {
      name: 'commit',
      type: 'submit',
      value,
      ...newData,
      ...rest,
    },
  };
  const result = tag(config);
  return result;
};

export const form = (options = {}) => {
  const {
    url, method = 'post', html = '', ...rest
  } = options;
  const config = {
    name: 'form',
    attributes: {
      'accept-charset': 'UTF-8',
      action: url,
      'data-remote': 'true',
      method,
      ...rest,
    },
    html,
  };
  const result = tag(config);
  return result;
};

export class Form {
  constructor(options = {}) {
    const {
      scope, ...rest
    } = options;
    this.scope = scope;
    this.rest = rest;
  }

  render(html = '') {
    const { method = 'post' } = this.rest;
    let methodInput = '';
    let newMethod = method;
    if (method !== 'get' && method !== 'post') {
      methodInput = textFieldTag('_method', method, { type: 'hidden' });
      newMethod = 'post';
    }
    const key = 'key';
    const hidden = textFieldTag('authenticity_token', key, { type: 'hidden' });
    const newHtml = `${methodInput}${hidden}${html}`;
    return form({ ...this.rest, method: newMethod, html: newHtml });
  }

  textField(name, value, options) {
    if (this.scope) {
      const newName = `${this.scope}[${name}]`;
      return textFieldTag(newName, value, options);
    }
    return textFieldTag(name, value, options);
  }

  label(name, content, options) {
    if (this.scope) {
      const newName = `${this.scope}[${name}]`;
      return labelTag(newName, content, options);
    }
    return labelTag(name, content, options);
  }

  // eslint-disable-next-line
  submit(value, options) {
    return submitTag(value, options);
  }
}
