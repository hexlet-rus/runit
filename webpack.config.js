/* eslint-disable @typescript-eslint/no-var-requires */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

module.exports = {
  mode: env,
  entry: './app/javascript/application.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'assets'),
  },
  devtool: isProd ? false : 'eval-source-map',
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
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
};
