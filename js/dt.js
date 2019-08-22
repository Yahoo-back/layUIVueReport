$(function(){
    function GetQueryString(name) {
        var c = decodeURIComponent(location.search);
        var theRequest = new Object();
        if (c.indexOf("?") != -1) {
            var str = c.substr(1);
            strs = str.split("&");
            for ( var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var Request = undefined;
    Request = GetQueryString();
    var uuid = Request["uuid"];
    var token = Request["token"];
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/queryAfu",
        contentType: 'application/json',
        data: JSON.stringify({
            "cmd": "queryAfu",
            "token": token,
            "version": "1",
            "params": {
                "uuid": uuid,
            }
        }),
        success: function(json) {
            //判断detail下是否有afuBlack
            var a = json.detail;
            if(!("afuBlack" in a)){
                a.afuBlack = "";
            }
            else{
                a.afuBlack =  a.afuBlack;
            }
            var detail = json.detail.afuBlack;
            //判断detail下的afuBlack下是否有riskresult
            if(!("riskresult" in detail)){
                detail.riskresult = "";
            }
            else{
                detail.riskresult =  detail.riskresult;
            }
            //判断detail下的afuBlack下是否有socialnetwork
            if(!("socialnetwork" in detail)){
                detail.socialnetwork = "";
            }
            else{
                detail.socialnetwork =  detail.socialnetwork;
            }
            //判断detail下是否有name
            if(!("name" in detail)){
                detail.name = "";
            }
            else{
                detail.name = detail.name;
            }
            document.getElementById("name").innerHTML = detail.name;

            //欺诈分
            if(!("fraudscore" in detail)){
                detail.fraudscore = "";
            }
            else{
                detail.fraudscore = detail.fraudscore;
            }
            $('#indicatorContainer').radialIndicator({
                initValue: detail.fraudscore,//score
                percentage: true
            });

            //欺诈等级
            if(!("fraudlevel" in detail)){
                detail.fraudlevel = "";
            }
            else{
                detail.fraudlevel = detail.fraudlevel;
            }
            if(detail.fraudlevel == "0"){
                document.getElementById("riskEvaluation").innerHTML = "数据不足，无法计算欺诈等级 ";
            }
            if(detail.fraudlevel == "1"){
                document.getElementById("riskEvaluation").innerHTML = "风险等级：一级";
            }if(detail.fraudlevel == "2"){
                document.getElementById("riskEvaluation").innerHTML = "风险等级：二级";
            }
            if(detail.fraudlevel == "3"){
                document.getElementById("riskEvaluation").innerHTML = "风险等级：三级";
            }
            if(detail.fraudlevel == "4"){
                document.getElementById("riskEvaluation").innerHTML = "风险等级：四级";
            }
            if(detail.fraudlevel == "5"){
                document.getElementById("riskEvaluation").innerHTML = "风险等级：五级";
            }

            //性别
            if(!("sex" in detail)){
                detail.sex = "";
            }
            else{
                detail.sex = detail.sex;
            }
            document.getElementById("gender").innerHTML = detail.sex;

            //身份证
            if(!("idCard" in detail)){
                detail.idCard = "";
            }
            else{
                detail.idCard = detail.idCard;
            }
            document.getElementById("idNumberMask").innerHTML = detail.idCard;

            //list
            var list = json.detail.afuBlack.riskresult;
            for(var i=0;i<list.length;i++){
                var lists = list[i];
                if(lists.dataType == "undefined"){
                    lists.dataType = "";
                }
                if(!("dataType" in lists)){
                    lists.dataType = "";
                }
                else{
                    lists.dataType = lists.dataType;
                }

                if(lists.riskItemType == "undefined"){
                    lists.riskItemType = "";
                }
                if(!("riskItemType" in lists)){
                    lists.riskItemType = "";
                }
                else{
                    lists.riskItemType = lists.riskItemType;
                }

                if(lists.riskItemValue == "riskItemValue"){
                    lists.riskItemValue = "";
                }
                if(!("riskItemValue" in lists)){
                    lists.riskItemValue = "";
                }
                else{
                    lists.riskItemValue = lists.riskItemValue;
                }

                if(lists.riskTime == "undefined"){
                    lists.riskTime = "";
                }
                if(!("riskTime" in lists)){
                    lists.riskTime = "";
                }
                else{
                    lists.riskTime = lists.riskTime;
                }

                if(lists.riskDetail == "undefined"){
                    lists.riskDetail = "";
                }
                if(!("riskDetail" in lists)){
                    lists.riskDetail = "";
                }
                else{
                    lists.riskDetail = lists.riskDetail;
                }

                if(lists.remarks == "undefined"){
                    lists.remarks = "";
                }
                if(!("remarks" in lists)){
                    lists.remarks = "";
                }
                else{
                    lists.remarks = lists.remarks;
                }
                document.getElementById("list").innerHTML+= '<tr> <td >'+lists.dataType+'</td>\n' +
                    '                        <td >'+lists.riskItemType+'</td>\n' +
                    '                        <td id="riskItemValue">'+lists.riskItemValue+'</td>\n' +
                    '                        <td id="riskTime">'+lists.riskTime+'</td>\n' +
                    '                        <td id="riskDetail">'+lists.riskDetail+'</td>\n' +
                    '                        <td id="remarks">'+lists.remarks+'</td></tr>'
            }

            //三列表
            var socialnetwork = json.detail.afuBlack.socialnetwork;
            var social = JSON.parse(socialnetwork);
            if(!("activeCallBlackCnt" in social)){
                social.activeCallBlackCnt = "";
            }
            else{
                social.activeCallBlackCnt = social.activeCallBlackCnt;
            }
            document.getElementById("activeCallBlackCnt").innerHTML = social.activeCallBlackCnt;
            if(!("activeCallCnt" in social)){
                social.activeCallCnt = "";
            }
            else{
                social.activeCallCnt = social.activeCallCnt;
            }
            document.getElementById("activeCallCnt").innerHTML = social.activeCallCnt;
            if(!("activeCallOverdueCnt" in social)){
                social.activeCallOverdueCnt = "";
            }
            else{
                social.activeCallOverdueCnt = social.activeCallOverdueCnt;
            }
            document.getElementById("activeCallOverdueCnt").innerHTML = social.activeCallOverdueCnt;
            if(!("fictionCallCnt" in social)){
                social.fictionCallCnt = "";
            }
            else{
                social.fictionCallCnt = social.fictionCallCnt;
            }
            document.getElementById("fictionCallCnt").innerHTML = social.fictionCallCnt;
            if(!("fictionCallNum" in social)){
                social.fictionCallNum = "";
            }
            else{
                social.fictionCallNum = social.fictionCallNum;
            }
            document.getElementById("fictionCallNum").innerHTML = social.fictionCallNum;
            if(!("fictionCallSeconds" in social)){
                social.fictionCallSeconds = "";
            }
            else{
                social.fictionCallSeconds = social.fictionCallSeconds;
            }
            document.getElementById("fictionCallSeconds").innerHTML = social.fictionCallSeconds;
            if(!("loanCallCnt" in social)){
                social.loanCallCnt = "";
            }
            else{
                social.loanCallCnt = social.loanCallCnt;
            }
            document.getElementById("loanCallCnt").innerHTML = social.loanCallCnt;
            if(!("loanCallNum" in social)){
                social.loanCallNum = "";
            }
            else{
                social.loanCallNum = social.loanCallNum;
            }
            document.getElementById("loanCallNum").innerHTML = social.loanCallNum;
            if(!("loanCallSeconds" in social)){
                social.loanCallSeconds = "";
            }
            else{
                social.loanCallSeconds = social.loanCallSeconds;
            }
            document.getElementById("loanCallSeconds").innerHTML = social.loanCallSeconds;
            if(!("macaoCallCnt" in social)){
                social.macaoCallCnt = "";
            }
            else{
                social.macaoCallCnt = social.macaoCallCnt;
            }
            document.getElementById("macaoCallCnt").innerHTML = social.macaoCallCnt;
            if(!("macaoCallNum" in social)){
                social.macaoCallNum = "";
            }
            else{
                social.macaoCallNum = social.macaoCallNum;
            }
            document.getElementById("macaoCallNum").innerHTML = social.macaoCallNum;
            if(!("macaoCallSeconds" in social)){
                social.macaoCallSeconds = "";
            }
            else{
                social.macaoCallSeconds = social.macaoCallSeconds;
            }
            document.getElementById("macaoCallSeconds").innerHTML = social.macaoCallSeconds;
            if(!("nightCallCnt" in social)){
                social.nightCallCnt = "";
            }
            else{
                social.nightCallCnt = social.nightCallCnt;
            }
            document.getElementById("nightCallCnt").innerHTML = social.nightCallCnt;
            if(!("nightCallNum" in social)){
                social.nightCallNum = "";
            }
            else{
                social.nightCallNum = social.nightCallNum;
            }
            document.getElementById("nightCallNum").innerHTML = social.nightCallNum;
            if(!("nightCallSeconds" in social)){
                social.nightCallSeconds = "";
            }
            else{
                social.nightCallSeconds = social.nightCallSeconds;
            }
            document.getElementById("nightCallSeconds").innerHTML = social.nightCallSeconds;
            if(!("remoteCallCnt" in social)){
                social.remoteCallCnt = "";
            }
            else{
                social.remoteCallCnt = social.remoteCallCnt;
            }
            document.getElementById("remoteCallCnt").innerHTML = social.remoteCallCnt;
            if(!("remoteCallNum" in social)){
                social.remoteCallNum = "";
            }
            else{
                social.remoteCallNum = social.remoteCallNum;
            }
            document.getElementById("remoteCallNum").innerHTML = social.remoteCallNum;
            if(!("remoteCallSeconds" in social)){
                social.remoteCallSeconds = "";
            }
            else{
                social.remoteCallSeconds = social.remoteCallSeconds;
            }
            document.getElementById("remoteCallSeconds").innerHTML = social.remoteCallSeconds;
            if(!("firstOrderBlackCnt" in social)){
                social.firstOrderBlackCnt = "";
            }
            else{
                social.firstOrderBlackCnt = social.firstOrderBlackCnt;
            }
            document.getElementById("firstOrderBlackCnt").innerHTML = social.firstOrderBlackCnt;
            if(!("firstOrderBlackRate" in social)){
                social.firstOrderBlackRate = "";
            }
            else{
                social.firstOrderBlackRate = social.firstOrderBlackRate;
            }
            document.getElementById("firstOrderBlackRate").innerHTML = social.firstOrderBlackRate*100;
            if(!("firstOrderM3Cnt" in social)){
                social.firstOrderM3Cnt = "";
            }
            else{
                social.firstOrderM3Cnt = social.firstOrderM3Cnt;
            }
            document.getElementById("firstOrderM3Cnt").innerHTML = social.firstOrderM3Cnt;
            if(!("firstOrderOverdueCnt" in social)){
                social.firstOrderOverdueCnt = "";
            }
            else{
                social.firstOrderOverdueCnt = social.firstOrderOverdueCnt;
            }
            document.getElementById("firstOrderOverdueCnt").innerHTML = social.firstOrderOverdueCnt;
            if(!("firstOrderOverdueRate" in social)){
                social.firstOrderOverdueRate = "";
            }
            else{
                social.firstOrderOverdueRate = social.firstOrderOverdueRate;
            }
            document.getElementById("firstOrderOverdueRate").innerHTML = social.firstOrderOverdueRate*100;
            if(!("secondOrderBlackCnt" in social)){
                social.secondOrderBlackCnt = "";
            }
            else{
                social.secondOrderBlackCnt = social.secondOrderBlackCnt;
            }
            document.getElementById("secondOrderBlackCnt").innerHTML = social.secondOrderBlackCnt;
            if(!("secondOrderM3Cnt" in social)){
                social.secondOrderM3Cnt = "";
            }
            else{
                social.secondOrderM3Cnt = social.secondOrderM3Cnt;
            }
            document.getElementById("secondOrderM3Cnt").innerHTML = social.secondOrderM3Cnt;
            if(!("secondOrderOverdueCnt" in social)){
                social.secondOrderOverdueCnt = "";
            }
            else{
                social.secondOrderOverdueCnt = social.secondOrderOverdueCnt;
            }
            document.getElementById("secondOrderOverdueCnt").innerHTML = social.secondOrderOverdueCnt;
            if(!("courtCallNum" in social)){
                social.courtCallNum = "";
            }
            else{
                social.courtCallNum = social.courtCallNum;
            }
            document.getElementById("courtCallNum").innerHTML = social.courtCallNum;
            if(!("lawyerCallNum" in social)){
                social.lawyerCallNum = "";
            }
            else{
                social.lawyerCallNum = social.lawyerCallNum;
            }
            document.getElementById("lawyerCallNum").innerHTML = social.lawyerCallNum;
            if(!("mobileLocation" in social)){
                social.mobileLocation = "";
            }
            else{
                social.mobileLocation = social.mobileLocation;
            }
            document.getElementById("mobileLocation").innerHTML = social.mobileLocation;
            if(!("mobileOperator" in social)){
                social.mobileOperator = "";
            }
            else{
                social.mobileOperator = social.mobileOperator;
            }
            document.getElementById("mobileOperator").innerHTML = social.mobileOperator;
        }
    })
})