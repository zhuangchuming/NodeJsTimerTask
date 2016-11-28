var task = {
    insert:'INSERT INTO task(id, publicTime, stopTime, content, title, co_content, haspush, readCount, hasstop) VALUES(0,?,?,?,?,"",0,0,0)',
    // update:'update task set publicTime=?, stopTime=?, readCount=? where id=?',
    updateTask:'update task set publicTime=?, stopTime=?, content=?, title=? where id=?',
    updateReadCount:'update task set readCount=? where id=?',//更新读取状态
    queryById: 'select * from task where id=?',//查询id
    queryPublicTime: 'select * from task where publicTime=?',//查询发布事件
    queryByStopTime:'select * from task where stopTime>sysdate() and publicTime<sysdate()',//查询待下架所有内容
    queryByPublicTime:'select * from task where publicTime>sysdate()',//查询待发布所有内容

    deleteById:'delete from task where id=?',
    //发布
    query_not_public:'select * from task where haspush=0 and publicTime>sysdate()',//未发布的任务
    query_not_public_but_pass:'select * from task where haspush=0 and publicTime<sysdate() and stopTime>sysdate()',//查询待下架未发布内容（更新数据库的haspush 字段,并且发布）
    query_public_but_not_pass:'select * from task where haspush=1 and publicTime<sysdate() and stopTime>sysdate()',//查询待下架已发布的内容
    //下架
    query_not_stop_but_pass:'select * from task where hasstop=0 and stopTime<sysdate()',//已过时，未下架（更新数据库的hasstop 字段，并且下架）
    // query_not_stop_but_not_pass:'select * from task where stopTime>sysdate() and publicTime<sysdate()',//查询待下架所有内容
    //更新关闭服务器期间所有数据
    updatehaspush:'update task set haspush=?, co_content=? where id=?',
    updatehasstop:'update task set hasstop=?, haspush=?, co_content=? where id=?',
};

module.exports = task;