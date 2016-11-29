/** * * * * * * * * * * * * * * *
 * 作者：庄楚明
 * 时间：2016.11.28
 * * * * * * * * * * * * * * * * */
var gVar = {
    stopTaskList: [],
    publicTaskList: [],
    // BASE_URL:"10.0.201.49:8081",
    BASE_URL: "192.168.1.103:8081",

    getBaseUrl: function () {
        return "http://" + this.BASE_URL;
    },

    getRequest: function (url, successCallback) {
        $.ajax({
            type: "get",
            url: this.getBaseUrl() + url,
            dataType: "application/json",
            success: function (data) {
                if (data) {
                    // alert(data)
                    if (successCallback)
                        successCallback(JSON.parse(data));
                    // var a = $.parseJSON(data);
                    //alert(a);
                } else {
                    alert('失败');
                }
            },
            error: function () {
                alert('失败``````````````');
            }
        });
    },
    postRequest: function (params, url, successCallback) {
        $.ajax({
            type: "post",
            url: this.getBaseUrl() + url,
            data: params,
            dataType: "application/json",
            success: function (data) {
                if (data) {
                    // alert(data)
                    if (successCallback)
                        successCallback(JSON.parse(data));
                    // var a = $.parseJSON(data);
                    //alert(a);
                } else {
                    alert('postRequest失败');
                }
            },
            error: function () {
                alert('失败``````````````');
            }
        });
    },

    //当前页面切换动画类型名,程序运行时会动态更改, 以实现前进后退
    pageTranType: "pagepush", //or "pagepop"

    //切换到新页面
    pushPage: function (pathname) {
        gVar.pageTranType = "pagepush";
        console.log(global.router);
        global.router.props.history.push(pathname);
    },

    //页面回退
    popPage: function () {

        gVar.pageTranType = "pagepop";
        // console.log(global.router.history);
        global.router.props.history.goBack();
    },

    strDateTime: function (str) {
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = str.match(reg);
        if (r == null)return false;
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    },
}

module.exports = gVar;