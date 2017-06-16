var http = require('http');
var API = require('wechat-api');
var appID = 'wx640d51f64384c56e';
var appSecret = '4c9090fd46e69f987d67c5902aedf167';
var api = new API(appID,appSecret);
var express = require('express');
var app = express();
var wechat = require('wechat');
var config = {
  appid: appID,
  appsecret: appSecret,
  token: 'token'
};


app.use(express.query());
// app.use('/', wechat(config, function (req, res, next) {
//   var message = req.weixin;
//   console.log(message);
//   res.reply("Hello");
// }));
/*
 * 响应微信测试服务器的连接验证
 **/
app.get('/', function(req, res){
   var echostr = req.query.echostr,
       signature = req.query.signature;
   console.log('signature',signature);
   res.send('hello123');
   //res.send(req.query.echostr);
});
/*
 * 测试获取token命令
 **/
app.get('/get_token',function(req,res) {
   api.getLatestToken(function(err,token) {
     console.log('token',token);
     res.send(token);
   });
});
app.listen(3000);
console.log("Server running at http://127.0.0.1:3000/");