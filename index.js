var http = require('http');
var API = require('wechat-api');
var appID = 'wx640d51f64384c56e';
var appSecret = '4c9090fd46e69f987d67c5902aedf167';
var TOKEN='gTMh5R7ssUP5rpkm5nHENtkRzp5hUh05'; 
var verify = require('./verifyURL');
var qs=require('qs');
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
app.use('/', wechat(config, function (req, res, next) {
  var message = req.weixin;
  console.log(message);
  res.reply("Hello");
}));
/*
 * 响应微信测试服务器的连接验证
 **/
app.get('/', function(request, response){
   // var echostr = req.query.echostr,
   //     signature = req.query.signature;
   // console.log('signature',signature);
   // res.send('hello123');
   //res.send(req.query.echostr);
    var query=require('url').parse(request.url).query;
    var params=qs.parse(query);

    console.log('params--',params);
    console.log("token :",TOKEN);

   if(!checkSignature(params,TOKEN)){
        //如果签名不对，结束请求并返回
        response.end('signature fail');
    }

    if (request.method == "GET") {
        //如果请求是GET，返回echostr用于通过服务器有效校验
        response.end(params.echostr);
    }else{
        //否则是微信给开发者服务器的POST请求
        var postdata='';
        request.addListener("data",function(postchunk){
            postdata+=postchunk;
        });
        //获取到了POST数据
        request.addListener("end",function(){
            console.log(postdata);
            response.end('success ');
        });
    }
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