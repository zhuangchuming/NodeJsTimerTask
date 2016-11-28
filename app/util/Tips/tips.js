require('./tips.css');

//提示框模块
//tipText:提示文字，提示信息文字
//showTime:1000，提示显示时间 以js毫秒为标准
//positionTop: "top"   "bottom"  默认居中显示,此参数不传 则垂直居中显示  
//var toast = {
function showTips(tipText, showTime, positionTop) {
    if($(".tipBox").length<1){
        //添加Dom元素，提示框
        $("html body").append("<p class='tipBox'></p>"); 
    }else{
        return;
    }

    var w = $(window).width();
    var h = $(window).height();

    //提示框内容
    $(".tipBox").html(tipText);
    var tLeft = parseInt((w - 48 - $(".tipBox").width()) / 2);
    var oTop = "80%";

    if (positionTop && positionTop == "top") {
        oTop = "20%";
    } else if (positionTop && positionTop == "center") {
        oTop = parseInt((h - $(".tipBox").height()) / 2);
    }

    //提示框定位
    $(".tipBox").css({ "left": tLeft, "top": oTop })

    $(".tipBox").fadeIn(1000);

    //关闭tip时间
    setTimeout(a, showTime || 1500);

    function a() {
        $(".tipBox").fadeOut(1000, function () {
            $(".tipBox").remove();
        });
    }

}
//}


module.exports = showTips;
