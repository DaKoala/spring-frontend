const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProd ? '[hash:base64:8]' : '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.ttf$|\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
  ],
};
