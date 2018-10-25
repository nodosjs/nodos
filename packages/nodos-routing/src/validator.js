import Ajv from 'ajv';
import routesSchema from '../files/routesSchema.json';
import routeSchema from '../files/routeSchema.json';

const ajv = new Ajv({ allErrors: true });

const validate = ajv.addSchema(routeSchema).compile(routesSchema);

export default (routeMap) => {
  const valid = validate(routeMap);

  if (!valid) {
    throw new TypeError('Routes schema is invalid');
  }

  return true;
};
