const csrfChecker = (instance) => (request, response, done) => {
  const checkingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (checkingMethods.includes(request.method)) {
    instance.csrfProtection(request, response, done);
  } else {
    done();
  }
};

const csrfPluginWrapper = (fastify, _opts, done) => {
  fastify.addHook('preHandler', csrfChecker(fastify));
  done();
};

csrfPluginWrapper[Symbol.for('skip-override')] = true;

module.exports = csrfPluginWrapper;
