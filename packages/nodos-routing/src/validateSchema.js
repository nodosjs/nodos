import validate from './schemas';

const validateSchema = (routeMap) => {
  const valid = validate(routeMap);

  if (!valid) {
    console.log('Routes schema is invalid:');
    console.log(validate.errors);
    throw new TypeError('Routes schema is invalid');
  }
  return true;
};

export default validateSchema;
