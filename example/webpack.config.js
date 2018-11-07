module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: `${__dirname}/frontend/js/index.js`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
