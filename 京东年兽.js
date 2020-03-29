
// list[0].children()[4].click()
function isOnView(){
    var a = textContains("邀请好友助力").findOnce();
    if(a==null){
        return false;
    }else{
        return true;
    }
}
function start(){
    try{
        while(true){
            var flag = false;
            for(var i=2;i<=6;i++){
                if(textContains("邀请好友助力").findOnce()==null){
                    continue;
                }
                var listView = className("android.widget.ListView").findOnce()
                if(listView==null){
                    continue;
                }
                var list = listView.children()
                sleep(200)
                if(list==null||list[i].children()===null){
                    continue;
                }
                if(list[i].children()[3]==null||!isOnView()){
                    continue;
                }else{
                    list[i].children()[3].click();
                }
            }
            sleep(500)
            if(!isOnView()){
                flag=true;
                back()
                log("完成一项任务")
            }
            if(!flag&&isOnView()){
                log("任务完成，爱你哟老婆~")
                break;
            }
            for(var i=0;i<3;i++){
                sleep(500)
                if(isOnView()){
                    break;
                }else{
                    back();
                }
            }
            if(!isOnView()){
                log("未检测到页面，系统重新开始运行")
                ready()
                break;
            }
        }
    }catch(err){
        log("检测出现错误，请返回页面重新运行")
        back()
        ready()
    }
}
function ready(){
    console.show();
    log("准备开始做年兽任务，请跳到年兽页面");
    var inta = setInterval(function(){
        if(isOnView()){
            log("检测到年兽页面，程序开始运行")
            start();
            clearInterval(inta)
        }else{
            log("未检测到年兽页面,请打开任务栏")
        }
    },2000)
}
ready()
