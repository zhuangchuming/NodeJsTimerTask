var React = require('react');
require('./../css/page.css')
var gVar = require('../global.js');
var WaitStopDetail = require('../component/waitStopDetail.js');
var WaitPushDetail = require('../component/waitPushDetail.js');
var TitleBar = require('../component/titlebar.js');

var CheckPage = React.createClass({

    componentDidMount(){
        var ins = this;
        // if (!gVar.timerList || gVar.timerList.length <= 0) {//为空时就获取数据，否则就
        gVar.getRequest('/getAllTask', function (data) {
            console.log("getAllTask", data);
            gVar.stopTaskList = data.stopTaskList;
            gVar.publicTaskList = data.publicTaskList;
            ins.setState({});
            return;
        });
        // }
        // console.log("stopTaskList", gVar.stopTaskList);
        // console.log("publicTaskList", gVar.publicTaskList);
    },

    render: function () {

        return (
            <div>
                <TitleBar backIsShow={true} task_addShow={true} check_show={false} title={"查看数据所有任务"}/>
                <WaitPushDetail />
                <WaitStopDetail />
            </div>
        );
    },

});

module.exports = CheckPage;