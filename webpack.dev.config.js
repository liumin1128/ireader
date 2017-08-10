const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const manifest = require('./dll/vendors-manifest.json');

module.exports = () => {
  return {
    entry: {
      index: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        './src/index.dev.js',
      ],
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/', // 同output的publicPath
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['react-hot-loader/webpack', 'babel-loader', 'eslint-loader'],
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
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'less-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader?modules', 'scss-loader', 'postcss-loader'],
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
    // resolve: {
    //   alias: {
    //     react: 'preact-compat',
    //     'react-dom': 'preact-compat',
    //     'preact-compat': 'preact-compat/dist/preact-compat',
    //   },
    // },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
      }),
      new CopyWebpackPlugin([{ from: './dll/vendors.dll.js', to: 'dll.js' }]),
      new HtmlWebpackPlugin({ template: './public/index.dev.html' }),
      // new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.NoEmitOnErrorsPlugin(), // 遇到错误继续
      new webpack.NamedModulesPlugin(), // prints more readable module names
      new webpack.DllReferencePlugin({ context: __dirname, manifest }),
    ],
    devServer: {
      port: 8000,
      host: '0.0.0.0',
      historyApiFallback: true,
      disableHostCheck: true,
      contentBase: '/', // 配置服务器目录
      publicPath: '/', // 同output的publicPath
      proxy: {
        '/api': {
          target: 'http://api.zhuishushenqi.com/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
        '/chapter': {
          target: 'http://chapter2.zhuishushenqi.com/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
        '/agent': {
          target: 'http://statics.zhuishushenqi.com/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
    // performance: {
    //   hints: options.dev ? false : 'warning',
    // },

  };
};
