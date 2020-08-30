import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: [
    path.resolve(__dirname, '../../app/assets/stylesheets/application.scss'),
    path.resolve(__dirname, '../../app/javascript/application.js'),
  ],
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, '../../public/assets'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};
