
/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */
var React = require('react');
var ReactDOM = require('react-dom');
import {hashHistory, Router, Route, IndexRoute} from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('react-fastclick');
var TitleBar = require('./component/titlebar.js');
require('./css/main.css');
var gVar = require('./global.js');
var toast = require('./util/Tips/tips.js');
//页面
var AddPage = require('./page/AddPage.js');
var ContentPage = require('./page/ContentDetail.js');
var CheckListPage = require('./page/CheckListPage.js');
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var displayTimerList, timerList;//保存定时任务列表
var pageTTT;

/* 如果str没有以/开头, 则加上/ */
function formatPathName(str) {
    var temp = str.substr(0, 1);
    if (temp != '/') {
        temp = '/' + str;
    }
    else {
        temp = str;
    }

    return temp;
}

/*代表整个应用的组件*/
var App = React.createClass({

    //自定义的成员变量, 动画效果需要提供一个key
    uniqueKey: 0,
    render: function () {
        var child = React.cloneElement(this.props.children, {key: formatPathName(this.props.location.pathname)});

        return (
            <ReactCSSTransitionGroup transitionName={gVar.pageTranType} transitionEnterTimeout={350}
                                     transitionLeaveTimeout={350}>
                {child}
            </ReactCSSTransitionGroup>);
    }
});


var Index = React.createClass({

    componentDidMount(){
        $("#server_addr").val(gVar.BASE_URL);
    },
    saveAddr(){
        var addr = $("#server_addr").val();
        gVar.BASE_URL = addr;
        toast("修改服务器地址成功");
    },

    add: function () {
        this.setState({});
    },

    render: function () {
        return (<div>
                <TitleBar backIsShow={false} task_addShow={true} title={"首页"} check_show={true}/>
                <div style={{
                    textAlign: "center",
                    height: "200px",
                    lineHeight: "200px"
                }}>
                    <span style={{fontSize: "25px", marginRight: "15px"}}>请输入服务器地址：</span>
                    <input style={{fontSize: "25px"}} id="server_addr"></input>
                </div>
                <div style={{textAlign: "center"}}>
                    <span style={{color: "white", padding: "20px", backgroundColor: "blue"}}
                          onClick={this.saveAddr}>确定</span>
                </div>

            </div>
        );

    }
});


ReactDOM.render(
    <Router ref={
        function (r) {
            global.router = r;
        }
    }
            history={hashHistory}>

        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="contentDetail" component={ContentPage}/>
            <Route path="addPage" component={AddPage}/>
            <Route path="checkListPage" component={CheckListPage}/>
        </Route>
    </Router>,
    document.getElementById('content')
);