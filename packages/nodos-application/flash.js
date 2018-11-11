// https://github.com/Paol-imi/fastify-flash

/* fastify-plugin */
const fp = require('fastify-plugin');
/* format util */
const format = require('util').format;


const validKey = key => key !== undefined;

const get = (session, key) => {
  const flash = session.flash;
  if (!flash) return undefined;

  let value = flash[key];
  if (!value) return undefined;

  if (value.length == 1) value = value[0];

  /* session will not save uselessly 'flash: {}' */
  if (Object.keys(flash).length == 1) delete session.flash;
  else delete flash[key];

  return value;
};

const set = (session, key, value) => {
  let flash = session.flash;
  if (!flash) flash = session.flash = {};

  let array = flash[key];
  if (!array) array = flash[key] = [];

  array.push(value);

  return array.length == 1
    ? array[0]
    : array;
};

const cleanUp = (req, reply, payload, next) => {
  delete req.flash;

  // session is automatically saved on 'onsend' event (so before this)
  // to delete flash istance use the session store
  const session = req.session;

  if (session.flash) {
    delete session.flash;
    req.sessionStore.set(session.sessionId, session, (err) => {
      next();
    });
  } else next();
};


/* my plugin */
const fastifyFlash = (fastify, opts, next) => {
  fastify.decorateRequest('flash', undefined);

  opts = opts || {};
  opts.cleanUp = opts.cleanUp !== false;

  fastify.addHook('preHandler', (req, reply, next) => {
    if (!req.flash) {
      function _flash(key, value) {
        if (!validKey(key)) throw Error('undefined key');

        const session = req.session;
        if (!session) throw Error('req.flash() requires sessions');

        if (arguments.length == 1) {
          // throw Error(arguments.length + key + value);
          return get(session, key);
        }
        if (arguments.length > 2) {
          /* slice arguments */
          if (!value) throw Error('undefined value');
          // throw Error('undefidgsdfgsdged value');
          const args = Array.prototype.slice.call(arguments, 1);
          value = format(...args);
        }

        return set(session, key, value);
      }

      req.flash = _flash;

      req.flash.clear = () => delete req.session.flash;

      req.flash.lengthOf = key => (!req.session.flash || !req.session.flash[key] ? 0 : req.session.flash[key].length);

      req.flash.contains = key => req.flash.lengthOf(key) > 0;
    }

    next();
  });

  // if (opts.cleanUp) fastify.addHook('onSend', cleanUp);

  next();
};

module.exports = fp(fastifyFlash, {
  name: 'fastify-flash',
  dependencies: ['fastify-session'],
});
