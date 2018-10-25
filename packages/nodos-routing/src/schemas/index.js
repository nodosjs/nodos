import Ajv from 'ajv';
import routesSchema from './routesSchema.json';
import routeSchema from './routeSchema.json';

const ajv = new Ajv({ allErrors: true });

const validate = ajv.addSchema(routeSchema).compile(routesSchema);

export default validate;
