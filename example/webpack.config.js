module.exports = {
  mode: process.env.NODE_ENV || 'development',
  output: {
    publicPath: '/assets',
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
