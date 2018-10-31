const users = [];

export const index = (request, response) => response.render({ users });

export const show = (request, response) => {
  const user = users.find(u => u.id === request.params.id);
  if (!user) {
    response.head(404);
    return;
  }

  response.render({ user });
};

export const create = (request, response) => {
  const { user } = request.body;
  if (user instanceof Object) { // validation
    users.push(user);
    response.redirectTo('/users');
    return;
  }

  response.render({ user }, 'new');
};

export const destroy = (request, response) => {
  const { id: userId } = request.params;
  if (userId) { // validation
    users.pop();
  }

  response.redirectTo('/users');
};
