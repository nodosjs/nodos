export const index = (request, reply) => {
  reply.send('users#index');
};

export const show = (request, reply) => {
  reply.send('users#show');
};
