const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'collectionLog.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /(\.ts|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
            },
          },
          {
            loader: 'ts-loader',
            // https://www.npmjs.com/package/ts-loader
            options: {
              // ...
            }
          },
          {
            loader: 'source-map-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {}
  },
  optimization: {
    minimize: true
  },
  plugins: [
  ]
}