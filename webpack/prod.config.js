const { merge } = require('webpack-merge');
const common = require('./common.config');

module.exports = (env) =>
  merge(common(env), {
    mode: 'production',
    output: {
      filename: '[name].[contenthash].js',
      publicPath: process.env.PUBLIC_URL,
      clean: true
    },
    optimization: {
      minimize: true,
    },
  });
