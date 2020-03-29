var page = "";
var retime = 0;
var aheadTime = 1000;
var setTimeString = "2020-01-07 10:00:00"
var isClick = false;
var openRefush = false;
function selectCheckBox(){
    while(true){
        var first_check = className("android.widget.CheckBox").findOne()
        if(first_check.checked()==false&&first_check.enabled()==true){
            first_check.click();
            isClick = true;
        }
    }
}
function settle(){
    while(true){
        var s = textContains("结算").findOne();
        if(s){ 
            s.click();
        }
        sleep(200)
    }
} 
function confirm(){
    while(true){
        var s = textContains("知道").findOne();
        if(s){
            s.click();
        }
    }
}
function submit(){
    while(true){
        var kone = text("提交订单").findOne()
        if(kone){
            kone.click();
            page="提交订单";
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
        retime = sjc - (reduceTime/2);
        log("asdasd"+retime)
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
function refush(){
    while(!isClick){
        var first_check = className("android.widget.CheckBox").findOnce()
        if(first_check&&first_check.checked()==false&&first_check.enabled()==true){
            continue;
        }
        swipe(504,521,504,1300,350)
        sleep(200)
    }
}
function start(){
    getTime();
    var ti = setTime()-aheadTime;
    toast("开始准备抢购:"+setTimeString+"提前:+"+aheadTime+"ms");
    while(true){
        var thisTime = new Date().getTime()-retime;
        if(thisTime>ti){
            toast("开始抢购");
            threads.start(function(){
                refush();
            })
            threads.start(function(){
                selectCheckBox();
            })
            threads.start(function(){
                settle();
            })
            threads.start(function(){
                confirm();
            })
            threads.start(function(){
                submit();
            })
            break;
        }
        // else{
        //     if(!openRefush){
                
        //         openRefush=true;
        //     }
        // }
    }  
}
start();


