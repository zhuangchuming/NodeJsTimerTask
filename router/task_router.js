/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */
var fs = require('fs');
var url = require('url');
var taskDao = require('../dao/taskDao.js');
var router = global.router;//获取路由

//设置跨域访问
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/',function (request,response) {
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");
    fs.readFile("index.html", function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            // HTTP 状态码: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // 响应文件内容
            console.log(request.url+"------"+pathname);
            response.write(data.toString());
        }
        //  发送响应数据
        response.end();
    });
})

//返回webpack编译后输出的bundle.js
router.get('/build/bundle.js',function (request,response) {
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");
    fs.readFile("build/bundle.js", function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            // HTTP 状态码: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // 响应文件内容
            console.log(request.url+"------"+pathname);
            response.write(data.toString());
        }
        //  发送响应数据
        response.end();
    });
})
//新增定时任务
router.post("/addTask",function (req,res,next) {
    console.log("request for"+ "/addTask");
    taskDao.add(req,res,next);
})
//获取所有任务
router.get("/getAllTask",function (req,res) {
    console.log("request for"+ "/getAllTask");
    taskDao.getAll(req,res);
})


//更新任务状态
router.post("/updateTask",function (req,res) {
    console.log("request for"+ "/updateTask");
    taskDao.updateTask(req,res);
})
//更新任务读取
router.post("/updateReadCount",function (req,res) {
    console.log("request for"+ "/updateReadCount");
    taskDao.updateReadCount(req,res);
})
//删除任务
router.post("/deleteTask",function (req,res) {
    console.log("request for"+ "/deleteTask");
    taskDao.deleteTask(req,res);
})