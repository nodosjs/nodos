module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: `${__dirname}/frontend/js/index.js`,
  output: {
    publicPath: '/assets',
    filename: 'main.js',
  },
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
