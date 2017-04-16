const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use('/static', express.static('static'));
app.use('/assets', express.static('assets'));
app.use('/api', proxy({
  target: 'http://api.zhuishushenqi.com/',
  pathRewrite: { '^/api': '/' },
  changeOrigin: true,
},
));
app.use('/chapter', proxy({
  target: 'http://chapter2.zhuishushenqi.com/',
  pathRewrite: { '^/chapter': '/chapter' },
  changeOrigin: true,
},
));
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.listen(8000);
