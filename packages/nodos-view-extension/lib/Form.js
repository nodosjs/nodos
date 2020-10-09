export default class Form {
  constructor(model) {
    this.model = model;
  }

  input(fieldName, _options) {
    const html = `
      <input type="text" name=${fieldName} value="${this.model[fieldName]}">
    `;

    return html;
  }
}
