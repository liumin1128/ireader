cnpm i -D babel-core babel-eslint babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react webpack webpack-dev-server html-webpack-plugin eslint@^3.19.0 eslint-plugin-import eslint-loader eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react babel-plugin-import file-loader babel-plugin-transform-runtime babel-plugin-transform-remove-console redux-devtools style-loader less-loader css-loader postcss-loader autoprefixer rimraf extract-text-webpack-plugin copy-webpack-plugin react-hot-loader@next less

cnpm i -S react react-dom react-router react-router-dom redux react-redux redux-saga material-ui@next material-ui-icons

cnpm i -S preact preact-compat react-router react-router-dom redux react-redux redux-saga

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
      },
