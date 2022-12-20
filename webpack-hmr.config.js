/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: ['./src/main.ts', 'webpack/hot/poll?100'],
    target: 'node',
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new RunScriptWebpackPlugin({ name: 'server.js', autoRestart: false }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
  },
  {
    mode: 'development',
    entry: './app/javascript/application.js',
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'assets'),
    },
    devtool: 'eval-source-map',
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
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin({}),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env.SENTRY_DSN': process.env.SENTRY_DSN,
      }),
      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
  },
];
