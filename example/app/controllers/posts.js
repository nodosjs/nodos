// import Post from '../entities/Post.js';

export const index = async (_request, response) => {
  const posts = []; // await Post.query();

  response.render({ posts });
};
