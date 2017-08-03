/*
* @Author: 刘敏
* @Date:   2016-02-17 20:53:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2016-12-31 22:11:41
*/

let express = require('express'),
  app = express(),
  server = require('http').createServer(app)
  ;

app.use('/', express.static(`${__dirname}/dist`));
server.listen(8080);
console.log('服务器8080');

