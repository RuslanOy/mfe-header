const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';

  const publicPath = isProd
    ? 'https://ruslanoy.github.io/mfe-header/'
    : 'http://localhost:3001/';

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/bootstrap',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      publicPath: publicPath,
      clean: true,
    },
    devtool: isProd ? false : 'eval-source-map',
    devServer: !isProd
      ? {
          port: 3001,
          hot: true,
          historyApiFallback: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
              'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers':
              'X-Requested-With, content-type, Authorization',
          },
        }
      : undefined,
    optimization: {
      minimize: isProd,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'header',
        filename: 'remoteEntry.js',
        exposes: {
          './Header': './src/Header',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: false,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development'
        ),
        'process.env.PUBLIC_URL': JSON.stringify(publicPath),
      }),
    ],
  };
};
