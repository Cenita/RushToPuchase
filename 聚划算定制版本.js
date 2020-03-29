// var a = text("选择").findOnce()
// if(a){
//     a.parent().click();
// }

var page = "";
var retime = 0;
var aheadTime = 500;
var setTimeString = "2019-12-16 16:41:00"
function collectClick(){
    while(true){
        var a = desc("找相似").findOnce();
        if(a){
            a.parent().parent().click();
            break;
        }
    }
}
function settle(){
    while(true){
        var s = textContains("立即购买").findOne();
        if(s){
            s.click();
        }
    }
}
function select(){
    while(true){
        var b = textContains("粉红色").findOnce();
        if(b){
            b.parent().parent().click();
            var a = descContains("256GB").findOnce();
            if(a){
                a.click();
            }
        }
    }
}
function confirm(){
    while(true){
        var a = id("confirm").findOne()
        if(a){
            a.click();
        }
    }
}
function submit(){
    while(true){
        var kone = text("提交订单").findOne()
        if(kone){
            kone.click();
            page="提交订单";
            break;
        }
    }
}
function getTime(){
    var timestamp1=new Date().getTime()
    http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp", {}, function(res, err){
        var networkTime = parseInt(res.body.json().data.t);
        var timestamp2=new Date().getTime();
        var reduceTime = (timestamp2 - timestamp1)/2;
        var timestamp3=new Date().getTime();
        var sjc = networkTime-(timestamp3-reduceTime);//淘宝和本机的时间差
        retime = sjc;
        toast("本机时间延迟"+sjc+"ms");
        toast("网络时延"+reduceTime+"ms");
    });
}
function setTime(){
    setTimeString = setTimeString.substring(0,19);    
    setTimeString = setTimeString.replace(/-/g,'/');
    setTimeNumber = new Date(setTimeString).getTime();
    return setTimeNumber;
}
function start(){
    getTime();
    var ti = setTime()-aheadTime;
    toast("开始准备抢购:"+setTimeString+"提前:"+aheadTime+"ms");
    while(true){
        var thisTime = new Date().getTime()-retime;
        if(thisTime>ti){
            toast("开始抢购");
            threads.start(function(){
                collectClick();
            })
            threads.start(function(){
                select();
            })
            threads.start(function(){
                confirm();
            })
            threads.start(function(){
                settle();
            })
            threads.start(function(){
                submit();
            })
            break;
        }
    }
}
start();

