/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */

var React = require('react');

var Task = require('./task.js')
var gVar = require('../global.js');


var WailPushDetail = React.createClass({

    showList: function () {
        var list = [];
        if (gVar.publicTaskList) {
            gVar.publicTaskList.forEach(item => {
                list.push(<Task task={item} type={"public"}/>);
            });
        }
        return list;
    },

    render(){
        var list = this.showList();
        var display = (list && list.length > 0) ? "block" : "none";
        return (
            <div >
                <div style={{fontSize: "20px", padding: "10px", display: display, backgroundColor: "gainsboro"}}>待发布
                </div>
                {list}
            </div>);
    }
});

module.exports = WailPushDetail;