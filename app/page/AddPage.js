var React = require('react');
require('./../css/page.css')
var gVar = require('../global.js');
var toast = require('../util/Tips/tips.js');
var TitleBar = require('../component/titlebar.js');

var AddPage = React.createClass({

        task: "",
        createTimerEntity: function () {//工厂方法产生一个任务计划
            var time = new Date();
            var ptime = new Date(time.setMinutes(time.getMinutes() + 10)).format("yyyy-MM-dd hh:mm:ss");//默认5分钟候发布
            // var pt = time.format("yyyy-MM-dd hh:mm:ss");
            var stime = new Date(time.setHours(time.getHours() + 1)).format("yyyy-MM-dd hh:mm:ss");//默认15分钟后下线
            // var st = time.format("yyyy-MM-dd hh:mm:ss");
            // console.log("time",ptime);
            var Timer = {
                publicTime: ptime,
                stopTime: stime,
                content: "",
                title: "",
            }
            return Timer;
        },

        save: function () {
            // alert("save");
            console.log("dfefefe ffe efe");
            if ($('#add_title').val() == null || $('#add_title').val().length == 0) {
                toast("请输入标题");
                return;
            }
            if ($('#add_content').val() == null || $('#add_content').val().length == 0) {
                toast("内容不能为空");
                return;
            }
            if (!gVar.strDateTime($('#public_time').val())) {
                toast("请输入有效的发布时间");
            }else{
                var settime = new Date($('#public_time').val()).getTime();
                if(new Date().getTime() > settime ){
                    toast("发布时间不能在当前时间之前")
                    return;
                }
            }
            if (!gVar.strDateTime($('#stop_time').val())) {
                toast("请输入有效的下架时间");
            }else{
                var settime = new Date($('#public_time').val()).getTime();
                var stoptime = new Date($('#stop_time').val()).getTime();
                if(stoptime < settime ){
                    toast("下架时间不能在发布时间之前")
                    return;
                }
            }
            this.task.publicTime = $('#public_time').val();
            this.task.stopTime = $("#stop_time").val();
            this.task.content = $("#add_content").val();
            this.task.title = $("#add_title").val();
            gVar.postRequest(this.task, "/addTask", function (data) {
                // alert(data + "cheng");
                console.log(data);
                if (data.code == 200) {
                    toast("新增任务成功")
                    $('#save').unbind("click");
                    console.log("postRequest",gVar.publicTaskList);
                    // gVar.timerList.push(data.timerList)
                    // gVar.pushPage("checkListPage");
                    gVar.popPage();
                }else{
                    toast("新增任务失败，请稍后重试")
                }
            });
        },

        componentDidMount(){
            this.task = this.createTimerEntity();
            $('#public_time').val(this.task.publicTime);
            $('#stop_time').val(this.task.stopTime)
            $('#save').click(this.save);
        },

        render()
        {

            return (
                <div className="addpage_body">
                    <TitleBar backIsShow={true} task_addShow={false} title={"新增任务"}/>
                    <div className="addpage_title" id="title"><input id="add_title"></input></div>
                    <div style={{padding: "20px"}}>
                        <textarea className="content_input" id="add_content" rows='10' cols='30'></textarea>
                    </div>
                    <div style={{paddingBottom: "10px"}}>
                        <span>发布时间：</span> <input id="public_time" className="time_input"
                                                  style={{marginRight: "10px"}}></input>
                        <span>下架时间：</span> <input id="stop_time" className="time_input"></input>
                        <span id="save" className="btn_span">保存</span>
                    </div>
                </div>);
        }
    })
    ;

module.exports = AddPage;