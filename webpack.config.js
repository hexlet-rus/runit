/* eslint-disable @typescript-eslint/no-var-requires */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './app/javascript/application.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'assets'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    net: 'net',
    fs: 'fs',
    tls: 'tls',
    os: 'os',
    child_process: 'child_process',
    'node-pty': 'node-pty',
    express: 'express',
    'express-ws': 'express-ws',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
      {
        test: /\.js\.map$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
      {
        test: /\.(jpg|png|jpeg|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.SENTRY_DSN': process.env.SENTRY_DSN,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
};