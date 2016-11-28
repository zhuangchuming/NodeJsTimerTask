var mysql = require('mysql');
var $sql = require('./tasksSqlMapping');
var async = require('async');
var Schedule = require('./scheduleDao.js');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
    res.end();
};
var pool = global.pool;

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            //获取前台页面传过来的参数
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            var param = req.body;
            console.log("request body", param);
            connection.query($sql.insert, [param.publicTime, param.stopTime, param.content, param.title], function (err, result) {
                // console.log(result);
                if (result) {
                    Schedule.addTimer({id: result.insertId, publicTime: param.publicTime, stopTime: param.stopTime})//新增定时任务到后台;
                    console.log("插入成功")
                    // connection.query($sql.queryPublicTime, [param.publicTime], function (err, result) {
                    var returnObj = new Object();
                    //     console.log("result", result);
                    //
                    // })
                    if (result) {
                        returnObj.id = result.insertId;
                        returnObj.code = 200;
                        returnObj.msg = "增加成功";
                    }
                    // console.log("queryByPublicTime", returnObj);
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, returnObj);
                    // 释放连接
                    connection.release();
                }
            });
        });
    },

    getAll: function (req, res) {
        pool.getConnection(function (err, connection) {
            //获取前台页面传过来的参数
            // 建立连接，向表中插入值
            connection.query($sql.queryByStopTime, function (err, result) {
                // console.log("queryByStopTime", result);
                connection.query($sql.queryByPublicTime, function (err, resu) {
                    // console.log("queryByPublicTime", resu);
                    if (result && resu) {
                        result = {
                            stopTaskList: result,
                            publicTaskList: resu,
                            code: 200,
                            msg: ''
                        };
                    }
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);
                    // 释放连接
                    connection.release();
                });
            });
        });
    },

    updateReadCount: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            //获取前台页面传过来的参数
            // var param = req.query || req.params;
            var param = req.body;
            connection.query($sql.queryById, [param.id], function (err, result) {
                // console.log("updateReadCount",result[0].readCount);
                if (result) {
                    var count = result[0].readCount + 1;
                    console.log("updateReadCount", count);
                    connection.query($sql.updateReadCount, [count, param.id], function (err, resu) {
                        if (resu) {
                            result = {
                                code: 200,
                                msg: '保存成功',
                                readCount: count,
                            };
                        }
                        // 以json形式，把操作结果返回给前台页面
                        jsonWrite(res, result);
                        // 释放连接
                        connection.release();
                    });
                }
            })

        });
    },

    updateTask: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            //获取前台页面传过来的参数
            // var param = req.query || req.params;
            var param = req.body;
            console.log(param);
            // 建立连接，向表中插入值
            connection.query($sql.queryById, [param.id], function (err, result) {
                if (result) {
                    if (new Date(result[0].publicTime).getTime() < new Date().getTime()) {//判断当前即将更新的时间是否已过期
                        var result = {
                            code: -1,
                            msg: '当前任务已发布，更新失败'
                        };
                        jsonWrite(res, result);
                        // 释放连接
                        connection.release();
                    }else{
                        connection.query($sql.updateTask, [param.publicTime, param.stopTime, param.content, param.title, param.id], function (err, result) {
                            console.log(result)
                            if (result) {
                                Schedule.updateTimer({
                                    id: result.insertId,
                                    publicTime: param.publicTime,
                                    stopTime: param.stopTime
                                })//更新任务
                                result = {
                                    code: 200,
                                    msg: '保存成功'
                                };
                            }
                            // 以json形式，把操作结果返回给前台页面
                            jsonWrite(res, result);
                            // 释放连接
                            connection.release();
                        });
                    }
                }
            })
        });
    },

    deleteTask: function (req, res) {
        pool.getConnection(function (err, connection) {
            var param = req.body;
            connection.query($sql.deleteById, [param.id], function (err, result) {
                if (result) {
                    Schedule.deleteTimer({id: param.id});//删除一条任务
                    result = {
                        code: 200,
                        msg: "删除成功"
                    }
                }
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            })
        })
    }
};