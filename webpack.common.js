const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isProd = env === 'production';
  return {
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
                  localIdentName: isProd ? '[hash:base64:8]' : '[local]',
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
};
