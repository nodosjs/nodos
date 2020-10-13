export default class Form {
  constructor(model) {
    this.model = model;
  }

  input(fieldName, options = {}) {
    options.push(true);
    const html = `
      <input type="text" name=${fieldName} value="${this.model[fieldName]}">
    `;

    return html;
  }
}
