const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const WebpackObfuscator = require('webpack-obfuscator')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')

const prod = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[contenthash].bundle.js'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new HtmlInlineScriptPlugin(),
    /*
    new WebpackObfuscator(
    {
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75
    })
    */
  ]
}

module.exports = merge(common, prod)
