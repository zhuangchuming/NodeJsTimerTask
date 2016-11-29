/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */
var React = require('react');
var gVar = require('../global.js');
var TitleBar = require('../component/titlebar.js');
require('./../css/page.css')
var toast = require('../util/Tips/tips.js');
var ContentDetail = React.createClass({

    task: "",
    type: "", //"public"待发布，"stop"待下架

    getInitialState(){
        this.task = this.props.location.state.task;
        this.type = this.props.location.state.type;
        // console.log("task", this.task)
        return null;
    },

    componentDidMount(){
        $('#update').click(this.update);
        if(this.type == "stop" ){//上架的商品需要增加读取状态
            var param = {
                id:this.task.id
            }
            gVar.postRequest(param, "/updateReadCount", function (data) {
                // alert(data + "cheng");
                // console.log(data);
                if (data.code == 200) {
                    toast("更新阅读成功")
                    $(".readCount_span").html("阅读("+data.readCount+")");
                } else {
                    toast("更新阅读失败")
                }
            });
        }else{
            $("#add_title").val(this.task.title);
            $("#public_time").val(this.task.publicTime);
            $("#stop_time").val(this.task.stopTime);
            $("#add_content").val(this.task.content);
        }
    },

    update: function () {
        // alert("save");
        // console.log("dfefefe ffe efe");
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
        gVar.postRequest(this.task, "/updateTask", function (data) {
            console.log(data);
            if (data.code == 200) {
                toast("修改成功")
                $('#update').unbind("click");
                // console.log("postRequest", gVar.publicTaskList);
                gVar.popPage();
            } else {
                toast(data.msg);
            }
        });
    },

    deleteTask:function () {
        var param = {
            id:this.task.id
        }
        gVar.postRequest(param, "/deleteTask", function (data) {
            // alert(data + "cheng");
            // console.log(data);
            if (data.code == 200) {
                toast("删除成功")
                gVar.popPage();
            } else {
                toast("删除失败")
            }
        });
    },

    render(){
        var publicT = this.type == "public" ? true : false;
        var show;
        if (publicT) {//待发布
            show =
                <div>
                    <div className="addpage_title" ><input id="add_title"></input></div>
                    <div style={{padding: "20px"}}>
                        <textarea className="content_input" id="add_content" rows='10' cols='30'></textarea>
                    </div>
                    <div style={{paddingBottom: "10px"}}>
                        <span>发布时间：</span> <input id="public_time" className="time_input"
                                                  style={{marginRight: "10px"}}></input>
                        <span>下架时间：</span> <input id="stop_time" className="time_input"></input>
                        <span id="update" className="btn_span">保存</span>
                    </div>
                </div>
        } else {//待下架
            show =
                <div>
                    <div className="addpage_title" id="title"><span id="add_title">{this.task.title}</span></div>
                    <div style={{padding: "20px"}}>
                        <div className="content_read" id="add_content" >{this.task.content}</div>
                        <div className="content_read" id="add_content" >发布后这里显示副本：{this.task.co_content}</div>
                    </div>
                    <div style={{paddingBottom: "10px"}}>
                        <span>发布时间：</span> <span id="public_time" className="time_input"
                                                 style={{marginRight: "10px"}}>{this.task.publicTime}</span>
                        <span>下架时间：</span> <span id="stop_time" className="time_input" >{this.task.stopTime}</span>
                        <span className="readCount_span">阅读({this.task.readCount})</span>
                    </div>
                </div>

        }
        return (
            <div>
                <TitleBar task_addShow={true} backIsShow={true} title={publicT ? "编辑" : this.task.title} task_addText={"删除"} task_addFunc={this.deleteTask}/>
                {show}
            </div>
        )
    }
});

module.exports = ContentDetail;
