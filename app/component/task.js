/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */

var React = require('react');
require('./style.css')
var gVar = require('../global.js');
var Task = React.createClass({

    propTypes: {
        type: React.PropTypes.string.isRequired,
        task: React.PropTypes.object.isRequired,
    },

    componentDidMount(){
        $("#task" + this.props.task.id).click(this.onItemClick.bind(this,this.props.task));
    },

    onItemClick: function (task) {
        $("#task" + this.props.task.id).unbind("click");
        var param={
            task :task,
            type : this.props.type,//"public","stop"
        }
        gVar.pushPage({pathname:"contentDetail",state:param})
    },
    //id是模块名字,模块点击后显示颜色
    handleTouchStart: function (id) {
        console.log(id)
        // var name = (id) ? id : "";
        $("#" + id).css("background-color", '#e4e4e4');
    },
    //id是模块名字
    handleTouchEnd: function (id) {
        // var name = (id) ? id : "";
        console.log(id)
        $("#" + id).css("background-color", "#ffffff");
    },
    render: function () {
        var task = this.props.task;
        return (
            <div id={"task" + task.id}
                 onTouchStart={this.handleTouchStart.bind(this, "task" + task.id) }
                 onTouchEnd={this.handleTouchEnd.bind(this, "task" + task.id) }
                 onTouchCancel={this.handleTouchEnd.bind(this, "task" + task.id) }>
                <span id={task.id} className="task_id">{task.title}</span>
                <span style={{
                    display: this.props.type == "public" ? "block" : "none",
                    float: "right",
                    lineHeight: "40px",
                    marginRight:"15px"
                }}>发布时间：{task.publicTime}</span>
                <span
                    style={{display: this.props.type == "stop" ? "block" : "none", float: "right", lineHeight: "40px",marginRight:"15px"}}>阅读({task.readCount})</span>
                <hr style={{width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "1px"}}></hr>
            </div>);
    }
});

module.exports = Task;