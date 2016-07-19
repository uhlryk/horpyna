var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var failPlugin = require('webpack-fail-plugin');

var node_modules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    node_modules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'babel-loader!ts-loader' },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  entry: [
    './src/index.ts'
  ],
  plugins: [
    failPlugin,
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, './dist/'),
    filename: 'index.js'
  },
  eslint: {

  },
  node: {
    __filename: true,
    __dirname: false
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  externals: node_modules,
  debug: false,
  progress: false,
  emitError: true,
  emitWarning: true,
  failOnError: true,
  stats: {
    colors: true,
    reasons: true
  }
};
