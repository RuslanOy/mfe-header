const { merge } = require('webpack-merge');
const common = require('./common.config');

module.exports = (env) =>
  merge(common(env), {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
      publicPath: 'http://localhost:3001/',
      clean: true
    },
    devServer: {
      port: 3001,
      hot: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
    },
  });
