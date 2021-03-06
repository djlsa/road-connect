const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/scripts/game.ts', './webpack/credits.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        include: path.join(__dirname, '../src'),
        loader: 'ts-loader'
      },
      {
        test: /\.asset?$/,
        type: 'json',
        include: path.join(__dirname, '../src/assets/Resources'),
        loader: 'yaml-loader'
      },
      {
        test: /\.(png|mp3)?$/,
        include: path.join(__dirname, '../src/assets'),
        loader: 'url-loader'
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      gameName: 'Road Connect',
      template: 'src/index.html',
      minify: true,
      inject: 'body',
      inlineSource: '.(js|css)$'
    }),
    /*
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    }),
    */
  ]
}
