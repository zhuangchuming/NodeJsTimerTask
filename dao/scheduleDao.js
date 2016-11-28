
var async = require('async');
var $sql = require('./tasksSqlMapping');
//  待发布队列，待下架队列
// var publicTaskListTimer = [], stopTaskListTimer = [];
var timeoutList = [];//与id绑定的定时任务列表
var pool = global.pool;
//为发布任务设置定时器
function setPublicTimeOut(task) {
    console.log("为 id=" + task.id + "设置了一个定时发布任务");
    return setTimeout(()=> {//将每个定时任务对象记录起来
        // console.log("public timeout " + task.id + (new Date(task.stopTime).getTime() - new Date().getTime()));
        pool.getConnection(function (err, connection) {
            connection.query($sql.updatehaspush, [1, task.content, task.id], function (err, resu) {//同时将content内容粘贴到副本
                if (resu) {
                    console.log("Public timeout update id:" + task.id + "success");
                }
                connection.release();
            });
        })
    }, new Date(task.publicTime).getTime() - new Date().getTime());
}

//为下架任务设置定时器
function setStopTimeOut(task) {
    console.log("为 id=" + task.id + "设置了一个定时下架任务");
    return setTimeout(()=> {//将每个定时任务对象记录起来
        // console.log("执行stop timeout " + task.id + (new Date(task.stopTime).getTime() - new Date().getTime()));
        pool.getConnection(function (err, connection) {
            connection.query($sql.updatehasstop, [1, 1, "", task.id], function (err, resu) {
                if (resu) {
                    console.log("Stop timeout update id:" + task.id + "success");
                }
                connection.release();
            });
        });
    }, new Date(task.stopTime).getTime() - new Date().getTime());
}

//未发布的任务(设置两个定时器)
function query_not_public() {
    pool.getConnection(function (err, connection) {
        connection.query($sql.query_not_public, function (err, result) {
            if (result) {
                // console.log("result", result);
            }
            connection.release();
            result.forEach((task)=> {
                var ob = {
                    id: task.id,
                    stopTimeOut: setStopTimeOut(task),
                    publicTimeOut: setPublicTimeOut(task),
                }
                timeoutList.push(ob);//待发布任务加入队列
                // stopTaskListTimer.push(task);//待下架任务加入队列
            })
            // console.log("timeoutList",timeoutList);
            // console.log("stopTaskListTimer",stopTaskListTimer);
        });
    });
}
//查询待下架未发布内容（更新数据库的haspush 字段,并且发布）（设置一个定时器，更新haspush、content）已测试
function query_not_public_but_pass() {
    var cache = new Array();
    pool.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                connection.query($sql.query_not_public_but_pass, function (err, result) {
                    // if (result) {
                    //     console.log("result", result);
                    // }
                    callback(null, result);
                });
            },
            function (result, callback) {
                if (!result) return;
                result.forEach((item)=> {
                    connection.query($sql.updatehaspush, [1, item.content, item.id], function (err, result) {//插入内容到副本
                        if (result) {
                            console.log(item.id + "haspush 状态更新成功");
                        }
                    });
                });
                callback(null, result);
            },
            function (result, callback) {
                result.forEach((task)=> {
                    var ob = {
                        id: task.id,
                        stopTimeOut: setStopTimeOut(task),
                    }
                    // stopTaskListTimer.push();
                    timeoutList.push(ob);//待发布任务加入队列
                })
                callback(null, result);
            }
        ], function (err, result) {
            connection.release();
        })
    })
}
//查询待下架已发布的内容（设置一个定时器）已测试
function query_public_but_not_pass() {
    pool.getConnection(function (err, connection) {
        connection.query($sql.query_public_but_not_pass, function (err, result) {
            if (!result) {
                // console.log("result", result);
            }
            connection.release();
            result.forEach((task)=> {//涉及多级闭包，所以在结束链接后去设置定时器，
                var ob = {
                    id: task.id,
                    stopTimeOut: setStopTimeOut(task),
                }
                timeoutList.push(ob);
            })
        });
    });

}
//已过时，未下架（更新数据库的hasstop 字段，并且下架）（更新数据库hasstop、co_content）已测试
function query_not_stop_but_pass() {
    pool.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                connection.query($sql.query_not_stop_but_pass, function (err, result) {
                    // if (result) {
                    //     console.log("result", result);
                    // }
                    callback(null, result);
                });

            },
            function (result, callback) {
                if (!result) return;
                result.forEach((item)=> {
                    connection.query($sql.updatehasstop, [1, 1, "", item.id], function (err, result) {//过时就把数据库副本位置清空
                        if (result) {
                            console.log(item.id + "hasstop 状态更新成功");
                        }
                    });
                });
            }
        ], function (err, result) {
            console.log(result);
            connection.release();
            // result now equals 'done'
            //  console.log('4');
        })
    })
}

//更新到数据库的同时，需要更新后台定时任务
function updateTimer(param) {//foreach不能中断
    for (var i = 0; i < timeoutList.length; i++) {
        if (timeoutList[i].id == param.id) {
            console.log("更新id为："+param.id+"的定时任务")
            timeoutList[i].stopTimeOut ? clearTimeout(timeoutList[i].stopTimeOut) : "";//先删除定时任务
            timeoutList[i].publicTimeOut ? clearTimeout(timeoutList[i].publicTimeOut) : "";
            timeoutList[i].publicTimeOut = setPublicTimeOut(param);//重新创建定时任务
            timeoutList[i].stopTimeOut = setStopTimeOut(param);
            break;
        }
    }
}

//删除任务的同时，删除本地定时任务
function deleteTimer(param) {
    for (var i = 0; i < timeoutList.length; i++) {
        if (timeoutList[i].id == param.id) {
            console.log("删除id为："+param.id+"的定时任务")
            timeoutList[i].stopTimeOut ? clearTimeout(timeoutList[i].stopTimeOut) : "";//先删除定时任务
            timeoutList[i].publicTimeOut ? clearTimeout(timeoutList[i].publicTimeOut) : "";
            timeoutList.splice(i, 1);//直接操作数组
            break;
        }
    }
}

//新增任务的同事，新增定时任务
function addTimer(param) {
    var ob = {
        id: param.id,
        stopTimeOut: setStopTimeOut(param),
        publicTimeOut: setPublicTimeOut(param),
    }
    console.log("新增一个id为："+param.id+"的定时任务")
    timeoutList.push(ob);
}

//并行查询数据库,避免在服务器关闭的时候有未处理的逻辑任务
async.parallel([query_not_public, query_not_public_but_pass,
    query_public_but_not_pass, query_not_stop_but_pass], function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result);
});
module.exports = {
    updateTimer,deleteTimer,addTimer
}
