export default class Form {
  constructor(model) {
    this.model = model;
  }

  input(fieldName) {
    const html = `
      <input type="text" name=${fieldName} value="${this.model[fieldName]}">
    `;

    return html;
  }
}
