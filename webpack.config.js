const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, argv) => {
  const modeEnv = argv.mode
  const isProd = modeEnv == 'production'
  console.log('>>>当前运行模式: ', modeEnv)

  // 编译uglify
  const uglify = new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,  //删除警告
        sequences: 20,  //使用逗号运算符连接简单语句
        dead_code: true,  //删除无用代码
        drop_debugger: true,  //删除debugger
        drop_console: true, //删除console
        toplevel: true, //删除在顶层作用域中放置未引用的函数
        unused: true, //删除未引用的函数和变量
        passes: 3,  //运行压缩的最大次数
      }
    },
    sourceMap: false,
    parallel: true
  })

  // optimization.minimizer
  const minimizer = []
  if (isProd) {
    minimizer.push(uglify)
  }

  // outputName
  const outputName = isProd ? 'collectionLog.min.js' : 'collectionLog.js'

  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputName
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
      minimize: true,
      noEmitOnErrors: true,
      mangleWasmImports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      // runtimeChunk: {
      //   name: "manifest"
      // },
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: "vendors",
      //       priority: -20,
      //       chunks: "all"
      //     }
      //   }
      // },
      minimizer: minimizer
    },
    plugins: [
    ]
  }
}