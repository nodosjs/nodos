---
to: "./app/entities/<%= h.changeCase.upperCaseFirst(name) %>.js"
---

// @ts-check

import { BaseEntity } from 'typeorm';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  email: yup.string().required().email(),
});

export default class <%= h.changeCase.upperCaseFirst(name) %> extends BaseEntity {
  constructor(attributes = {}) {
    super();
    this.email = attributes.email;
    this.firstName = attributes.firstName;
  }
  validate() {
    return schema.validate(this);
  }
}
