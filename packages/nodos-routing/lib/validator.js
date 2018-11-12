import Ajv from 'ajv';
import routesSchema from '../files/routesSchema.json';
import routeSchema from '../files/routeSchema.json';
import routeOnlyExceptSchema from '../files/routeOnlyExceptSchema.json';

const ajv = new Ajv({ allErrors: true });

const validate = ajv.addSchema(routeSchema).addSchema(routeOnlyExceptSchema).compile(routesSchema);

export default (routeMap) => {
  const valid = validate(routeMap);

  if (!valid) {
    throw new TypeError('Routes schema is invalid: ' + ajv.errorsText(validate.errors));
  }

  return true;
};
