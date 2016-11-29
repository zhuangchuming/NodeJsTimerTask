
/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */
var React = require('react');

var Task = require('./task.js')
var gVar = require('../global.js');


var WaitStopDetail = React.createClass({

    showList: function () {
        var list = [];
        gVar.stopTaskList.forEach(item => {
            list.push(<Task task={item} type={"stop"}/>);
        });
        return list;
    },

    render(){
        var id = this.props.id;
        var startId = "startId" + id;
        var endId = "end" + id;
        var list = this.showList();
        var display  = (list && list.length>0)? "block":"none";
        return (
            <div >
                <div style={{fontSize:"20px",padding:"10px",display:display,backgroundColor:"gainsboro"}}>待下架</div>
                {this.showList()}
            </div>);
    }
});

module.exports = WaitStopDetail;