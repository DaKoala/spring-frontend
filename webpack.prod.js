const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common('production'), {
  mode: 'production',
  plugins: [
    new CopyPlugin([
      { from: './public', to: '.' },
    ]),
  ],
});
