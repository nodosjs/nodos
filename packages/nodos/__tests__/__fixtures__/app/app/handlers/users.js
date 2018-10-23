export const index = (ctx, { models }) => {
  const users = [];
  return ctx.render({ users });
};

export const new = (ctx, { models }) => {
  const user = new models.User();
  return ctx.render({ user });
};

export const create = (ctx, { router }) => {
  const user = new models.User(ctx.params['user']);
  if (save(user)) {
    return ctx.redirect(router.usersPath());
  } else {
    return ctx.render({ user });
  }
};
