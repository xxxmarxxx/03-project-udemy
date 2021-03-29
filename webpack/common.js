const path = require("path").resolve;
const HtmlWebPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path(__dirname, "..", "scr", "index.js"),
  },
  output:{
      filename: '[name].[contenthash:6].js',
      path: path(__dirname, '..', 'build'),
  },
  resolve: {
      extensions:['.js', '.jsx'],
  },
  module:{
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use:{
                  loader: 'babel-loader',
              }
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin ({
          template: path(__dirname, '..', 'public', 'index.html'),
      })
  ]
};
