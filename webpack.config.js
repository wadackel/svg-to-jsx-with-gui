const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  entry: [
    ...(!isProduction ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
    ] : []),
    path.resolve(__dirname, 'src/index.js'),
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProduction ? './' : '/',
  },

  devtool: isProduction ? false : 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    ...(isProduction ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        IN_BROWSER: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      }),
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        IN_BROWSER: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
      }),
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'src'),
        from: './**/*.+(jpg|jpeg|png|gif|ico|svg)',
      },
    ]),
  ],

  devServer: isProduction ? {} : {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
