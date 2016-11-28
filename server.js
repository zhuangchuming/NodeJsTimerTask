// var http = require('http');

var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');//json解析

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
global.router = router;
require('./dao/baseDao.js');//包含创建数据链接池，必须放在其他Dao之前，全局用静态pool.
require('./router/task_router.js');//所有的路由都被server，require
require('./dao/scheduleDao.js');




var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
process.on('uncaughtException', function(err){console.log("error exit")});