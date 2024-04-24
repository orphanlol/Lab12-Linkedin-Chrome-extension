const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

require("babel-core/register");
require("babel-polyfill");

const PAGES_PATH = './src/pages';

function generateHtmlPlugins(items) {
  return items.map(name => new HtmlWebpackPlugin({
    filename: `./${name}.html`,
    chunks: [name],
    template: `${PAGES_PATH}/${name}/template.html`, // Added template option
  }));
}

module.exports = {
  entry: {
    background: [
      'babel-polyfill',
      `${PAGES_PATH}/background`,
    ],
    popup: [
      'babel-polyfill',
      `${PAGES_PATH}/popup`,
    ],
    index: [
      'babel-polyfill',
      `${PAGES_PATH}/content`,
    ],
    iframe: [
      'babel-polyfill',
      `${PAGES_PATH}/iframe`,
    ]
  },
  output: {
    path: path.resolve('dist/pages'),
    filename: '[name].js',
    publicPath: '/pages/', // Added publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // Improved performance by excluding node_modules
        use: [ 'babel-loader' ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin([
      {
        from: 'src',
        to: path.resolve('dist'),
        ignore: ['pages/**/*'],
      },
    ]),
    new ESLintPlugin(), // Added ESLintPlugin for code quality
    ...generateHtmlPlugins([
      'background',
      'popup',
      'iframe',
    ]),
  ],
};
