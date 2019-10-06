const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
});
