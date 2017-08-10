const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use('/static', express.static('static'));
app.use('/assets', express.static('assets'));
app.use('/api', proxy({
  target: 'http://api.zhuishushenqi.com/',
  pathRewrite: { '^/api': '/' },
  changeOrigin: true,
}));
app.use('/chapter', proxy({
  target: 'http://chapter2.zhuishushenqi.com/',
  pathRewrite: { '^/chapter': '/chapter' },
  changeOrigin: true,
}));
app.use('/agent', proxy({
  target: 'http://statics.zhuishushenqi.com/',
  // pathRewrite: { '^/chapter': '/chapter' },
  changeOrigin: true,
}));
app.use('/', express.static(`${__dirname}/dist`));
app.listen(8080);
console.log('服务器8080');
