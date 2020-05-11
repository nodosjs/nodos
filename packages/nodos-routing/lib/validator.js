const Ajv = require('ajv');
const routesSchema = require('../files/routesSchema.json');
const routeSchema = require('../files/routeSchema.json');
const routeOnlyExceptSchema = require('../files/routeOnlyExceptSchema.json');

const ajv = new Ajv({ allErrors: true });

const validate = ajv.addSchema(routeSchema).addSchema(routeOnlyExceptSchema).compile(routesSchema);

module.exports = (routeMap) => {
  const valid = validate(routeMap);

  if (!valid) {
    throw new TypeError(`Routes schema is invalid: ${ajv.errorsText(validate.errors)}`);
  }

  return true;
};
