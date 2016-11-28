var React = require('react');
var gVar = require('../global.js');
require('./style.css')
var TitleBar = React.createClass({

    propTypes: {
        backIsShow:React.PropTypes.bool,
        task_addShow: React.PropTypes.bool,
        title:React.PropTypes.string,
        check_show:React.PropTypes.string,
        task_addText:React.PropTypes.string,
        task_addFunc:React.PropTypes.func,
    },

    componentDidMount(){
        $('#back').click(this.back);
        $('#add').click(this.add);
        $('#check').click(this.check);
    },


    back:function () {
        gVar.popPage();
        $('#back').unbind("click");
    },
    add:function () {
        if(this.props.task_addText){
            this.props.task_addFunc();
        }else {
            gVar.pushPage("addPage");
            $('#add').unbind("click");
        }
    },
    check:function () {
        gVar.pushPage("checkListPage");
        $('#check').unbind("click");
    },
    render: function () {
        return (
            <div className="title" id="title_text">{this.props.title}
                <span id="back" className="task_back" style={{display:this.props.backIsShow ? "block": "none"}}>返回</span>
                <span id="add" className="task_add" style={{display:this.props.task_addShow ? "block": "none"}}>{this.props.task_addText?this.props.task_addText:"增加"}</span>
                <span id="check" className="task_add" style={{display:this.props.check_show ? "block": "none"}}>查看</span>
            </div>
        )
    },
});

module.exports = TitleBar;