const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const manifest = require('./dll/vendors-manifest.json');

module.exports = () => {
  return {
    entry: {
      index: './src/index.js',
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /favicon.(png|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]',
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules', 'postcss-loader'],
          }),
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules', 'less-loader', 'postcss-loader'],
          }),
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    // devtool: 'eval',
    // devtool: 'cheap-source-map',
    // resolve: {
    //   alias: {
    //     react: 'preact-compat',
    //     'react-dom': 'preact-compat',
    //   },
    // },
    plugins: [
      new ExtractTextPlugin('index.css'), // 单独打包css
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new CopyWebpackPlugin([
        {
          from: './dll/vendors.dll.js',
          to: 'dll.js',
        },
        {
          from: './public/**/*',
          to: '[name].[ext]',
        },
      ], {
        ignore: ['index.html'],
        copyUnmodified: true,
        debug: 'debug',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        hash: true,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
        },
      }),
      // new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      // new webpack.NoEmitOnErrorsPlugin(), // 遇到错误继续
      // new webpack.NamedModulesPlugin(), // prints more readable module names
      new webpack.DllReferencePlugin({ context: __dirname, manifest }),
      // new webpack.optimize.ModuleConcatenationPlugin(), // 模块串联，大幅减少包大小257k =》239k
      new webpack.optimize.UglifyJsPlugin({
        beautify: false, // 最紧凑的输出
        comments: false, // 删除所有的注释
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          // support_ie8: false, // 还可以兼容ie浏览器
          drop_console: true,  // 删除所有的 `console` 语句
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        },
      }),
    ],
  };
};
