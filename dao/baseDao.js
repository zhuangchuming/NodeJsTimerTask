var mysql = require('mysql');
//要创建的数据库名
var TEST_DATABASE = 'nodejs_mysql';
//要创建的表名
var TEST_TABLE = 'task';
var table_member =
    "CREATE TABLE IF NOT EXISTS task (" +
    "`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ," +
    "`publicTime` TEXT ," +//发布时间
    "`stopTime` TEXT ," +//下载时间
    "`content` TEXT ," +//发布内容
    "`title` TEXT ," +//发布内容标题
    "`co_content` TEXT ," +//副本
    "`haspush` TINYINT(1) DEFAULT 0 ," +//是否发布
    "`readCount` INT UNSIGNED NOT NULL DEFAULT 0 ," +//发布内容的浏览量
    "`hasstop` TINYINT(1) DEFAULT 0 " +//是否下载
    ") ENGINE = MYISAM ;";


// 使用连接池，提升性能
var pool = mysql.createPool(
    {
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'nodejs_mysql',
    });
pool.getConnection(function (err, connection) {
    connection.query(table_member, function (err, result) {
        if (err) {
            throw err
        } else {
            console.log("创建表成功")
        }
    })
})
global.pool = pool;