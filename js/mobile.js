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
        url: "/youdunDetail",
        contentType: 'application/json',
        data: JSON.stringify({
            "cmd": "youdunDetail",
            "token": token,
            "version": "1",
            "params": {
                "uuid": uuid,
                "token": token
            }
        }),
        success: function(json) {
            var score = json.detail.youdunScoreDetail[0].score;
            $('#indicatorContainer').radialIndicator({
                initValue: score*10,//score
                percentage: true
            });

            var name = json.detail.youdunIdDetail[0].nameCredible;
            var gender = json.detail.youdunIdDetail[0].gender;
            var nation = json.detail.youdunIdDetail[0].nation;
            var idNumberMask = json.detail.youdunIdDetail[0].idNumberMask;
            var address = json.detail.youdunIdDetail[0].address;
            document.getElementById("nameCredible").innerHTML = name;
            document.getElementById("gender").innerHTML = gender;
            document.getElementById("nation").innerHTML = nation;
            document.getElementById("idNumberMask").innerHTML = idNumberMask;
            document.getElementById("address").innerHTML = address;

            var riskEvaluation = json.detail.youdunScoreDetail[0].riskEvaluation;
            document.getElementById("riskEvaluation").innerHTML = riskEvaluation;

            var loanPlatformCount = json.detail.youdunLoanDetail[0].loanPlatformCount;
            var actualLoanPlatformCount = json.detail.youdunLoanDetail[0].actualLoanPlatformCount;
            var repaymentPlatformCount = json.detail.youdunLoanDetail[0].repaymentPlatformCount;
            var repaymentTimesCount = json.detail.youdunLoanDetail[0].repaymentTimesCount;
            document.getElementById("loanPlatformCount").innerHTML = loanPlatformCount;
            document.getElementById("actualLoanPlatformCount").innerHTML = actualLoanPlatformCount;
            document.getElementById("repaymentPlatformCount").innerHTML = repaymentPlatformCount;
            document.getElementById("repaymentTimesCount").innerHTML = repaymentTimesCount;

            var todayRequestLoanP = json.detail.youdunLoanDetail[0].todayRequestLoanP;
            var todayRequestLoanFre = json.detail.youdunLoanDetail[0].todayRequestLoanFre;
            var todayRequestLoanDivice = json.detail.youdunLoanDetail[0].todayRequestLoanDivice;
            var todayRequestLoanFreMax = json.detail.youdunLoanDetail[0].todayRequestLoanFreMax;
            var todayRequestLoanPMax = json.detail.youdunLoanDetail[0].todayRequestLoanPMax;
            document.getElementById("todayRequestLoanP").innerHTML = todayRequestLoanP;
            document.getElementById("todayRequestLoanFre").innerHTML = todayRequestLoanFre;
            document.getElementById("todayRequestLoanDivice").innerHTML = todayRequestLoanDivice;
            document.getElementById("todayRequestLoanFreMax").innerHTML = todayRequestLoanFreMax;
            document.getElementById("todayRequestLoanPMax").innerHTML = todayRequestLoanPMax;

            //用户特征
            var userFeatureType = json.detail.userFeatures[0].userFeatureType;
            var lastModifiedDate1 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate2 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate3 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate4 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate5 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate6 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate7 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate8 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate9 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate10 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate11 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate12 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate13 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate14 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate15 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate16 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate17 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate18 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate19 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate20 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate21 = json.detail.userFeatures[0].lastModifiedDate;
            var lastModifiedDate22 = json.detail.userFeatures[0].lastModifiedDate;
            if(userFeatureType == "1"){
                document.getElementById("lastModifiedDate1").innerHTML = lastModifiedDate1;
                document.getElementById("t1").style.background = "#4694D9";
            }
            if(userFeatureType == "2"){
                document.getElementById("lastModifiedDate2").innerHTML = lastModifiedDate2;
                document.getElementById("t2").style.background = "#4694D9";
            }
            if(userFeatureType == "3"){
                document.getElementById("lastModifiedDate3").innerHTML = lastModifiedDate3;
                document.getElementById("t3").style.background = "#4694D9";
            } if(userFeatureType == "4"){
                document.getElementById("lastModifiedDate4").innerHTML = lastModifiedDate4;
                document.getElementById("t4").style.background = "#4694D9";
            } if(userFeatureType == "5"){
                document.getElementById("lastModifiedDate5").innerHTML = lastModifiedDate5;
                document.getElementById("t5").style.background = "#4694D9";
            }
            if(userFeatureType == "6"){
                document.getElementById("lastModifiedDate6").innerHTML = lastModifiedDate6;
                document.getElementById("t6").style.background = "#4694D9";
            }
            if(userFeatureType == "7"){
                document.getElementById("lastModifiedDate7").innerHTML = lastModifiedDate7;
                document.getElementById("t7").style.background = "#4694D9";
            }
            if(userFeatureType == "8"){
                document.getElementById("lastModifiedDate8").innerHTML = lastModifiedDate8;
                document.getElementById("t8").style.background = "#4694D9";
            }
            if(userFeatureType == "9"){
                document.getElementById("lastModifiedDate9").innerHTML = lastModifiedDate9;
                document.getElementById("t9").style.background = "#4694D9";
            }
            if(userFeatureType == "10"){
                document.getElementById("lastModifiedDate10").innerHTML = lastModifiedDate10;
                document.getElementById("t10").style.background = "#4694D9";
            }
            if(userFeatureType == "11"){
                document.getElementById("lastModifiedDate11").innerHTML = lastModifiedDate11;
                document.getElementById("t11").style.background = "#4694D9";
            }
            if(userFeatureType == "12"){
                document.getElementById("lastModifiedDate12").innerHTML = lastModifiedDate12;
                document.getElementById("t12").style.background = "#4694D9";
            }
            if(userFeatureType == "13"){
                document.getElementById("lastModifiedDate13").innerHTML = lastModifiedDate13;
                document.getElementById("t13").style.background = "#4694D9";
            } if(userFeatureType == "14"){
                document.getElementById("lastModifiedDate14").innerHTML = lastModifiedDate14;
                document.getElementById("t14").style.background = "#4694D9";
            }
            if(userFeatureType == "15"){
                document.getElementById("lastModifiedDate15").innerHTML = lastModifiedDate15;
                document.getElementById("t15").style.background = "#4694D9";
            }
            if(userFeatureType == "16"){
                document.getElementById("lastModifiedDate16").innerHTML = lastModifiedDate16;
                document.getElementById("t16").style.background = "#4694D9";
            }
            if(userFeatureType == "17"){
                document.getElementById("lastModifiedDate17").innerHTML = lastModifiedDate17;
                document.getElementById("t17").style.background = "#4694D9";
            }
            if(userFeatureType == "18"){
                document.getElementById("lastModifiedDate18").innerHTML = lastModifiedDate18;
                document.getElementById("t18").style.background = "#4694D9";
            }
            if(userFeatureType == "19"){
                document.getElementById("lastModifiedDate19").innerHTML = lastModifiedDate19;
                document.getElementById("t19").style.background = "#4694D9";
            }
            if(userFeatureType == "20"){
                document.getElementById("lastModifiedDate20").innerHTML = lastModifiedDate20;
                document.getElementById("t20").style.background = "#4694D9";
            }
            if(userFeatureType == "21"){
                document.getElementById("lastModifiedDate21").innerHTML = lastModifiedDate21;
                document.getElementById("t21").style.background = "#4694D9";
            }
            if(userFeatureType == "22"){
                document.getElementById("lastModifiedDate22").innerHTML = lastModifiedDate22;
                document.getElementById("t22").style.background = "#4694D9";
            }

            //bar1

            var item1 = [];
            var item2 = [];
            var item3 = [];
            item1.push(json.detail.youdunLoanDetail[0].loanPlatformCount, json.detail.youdunLoanDetail[0].loanPlatformCount6m, json.detail.youdunLoanDetail[0].loanPlatformCount3m, json.detail.youdunLoanDetail[0].loanPlatformCount1m)
            item2.push(json.detail.youdunLoanDetail[0].actualLoanPlatformCount, json.detail.youdunLoanDetail[0].actualLoanPlatformCount6m, json.detail.youdunLoanDetail[0].actualLoanPlatformCount3m, json.detail.youdunLoanDetail[0].actualLoanPlatformCount1m)
            item3.push(json.detail.youdunLoanDetail[0].repaymentPlatformCount, json.detail.youdunLoanDetail[0].repaymentPlatformCount6m, json.detail.youdunLoanDetail[0].repaymentPlatformCount3m, json.detail.youdunLoanDetail[0].repaymentPlatformCount1m)
            var myChart = echarts.init(document.getElementById('main'),'macarons');

            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['申请借款', '借款'],
                    right: 0,
                    itemGap: 50
                },
                grid: {
                    left: '5%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['总计', '近6月', '近3月', '近1月'],
                        axisTick: {
                            alignWithLabel: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: { show: false }
                    }
                ],
                series : [
                    {
                        name:'申请借款',
                        type:'bar',
                        data: item1,
                        barWidth: 30,
                        barGap: 0,
                        itemStyle: {
                            normal: {
                                color: '#4694D9'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    },
                    {
                        name:'借款',
                        type:'bar',
                        data: item2,
                        // data:[2.6, 5.9, 9.0, 26.4],
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                color: '#77D7E8'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }
                ]
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            //bar2
            var myCharts = echarts.init(document.getElementById('h'));
            // 指定图表的配置项和数据
            var option = {
                color:"#000",
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['还款'],
                    left: 25,
                    itemGap: 50
                },
                grid: {
                    left: '5%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['总计', '近6月', '近3月', '近1月'],
                        axisTick: {
                            alignWithLabel: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: { show: false }
                    }
                ],
                series: [
                    {
                        name:'还款',
                        type:'bar',
                        // data:[2.6, 5.9, 9.0, 26.4],
                        data: item3,
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                color: '#25B97D'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myCharts.setOption(option);


            // $.each(json.detail.youdunDevicesList,function(i,item){
            //     var device = json.detail.youdunDevicesList
            //     console.log(device[i].deviceName);
            //     document.getElementById("#deviceName").innerHTML(device[i].deviceName)
            // })
            var amounts = json.detail.youdunDevicesList.length;
            document.getElementById("amount").innerHTML = amounts;
            //手机设备
            var deviceList = json.detail.youdunDevicesList;
            for(var i=0;i<deviceList.length;i++){    //遍历data数组
                var ls = deviceList[i];
                var p = deviceList[i].deviceDetail;
                var obj = JSON.parse(p);
                var port = obj.isUsingProxyPort;
                if (port == "0") {
                    port = "否";
                }
                else if(port == "1") {
                    port = "是";
                }
                else{
                    port = "";
                }
                var rooted = obj.isRooted;
                if (rooted == "0") {
                    rooted = "否"
                }
                else if(rooted == "1") {
                    rooted = "是"
                }
                else{
                    rooted = ""
                }
                var cheat = obj.cheatsDevice;
                if (cheat == "0") {
                    cheat = "否"
                }
                else if(cheat == "1") {
                    cheat = "是"
                }
                else{
                    cheat = ""
                }
                if(obj.appInstalmentCount == "undefined"){
                    obj.appInstalmentCount = "";
                }
               if(!("appInstalmentCount" in obj)){
                   obj.appInstalmentCount = "";
               }
               else{
                   obj.appInstalmentCount = obj.appInstalmentCount;
               }
                document.getElementById("device").innerHTML+= '<li class="right-border one"> <p class="layui-icon layui-icon-cellphone b"></p> <p class="p-title c" >'+ls.deviceName+'</p> <p> <span class="span-title">设备ID：</span> <span class="span-content">'+ls.deviceId+'</span> </p> </li><li class="two" >\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="margin-top: 30px"><span class="span-title">最近使用时间：</span><span class="span-content">'+ls.deviceLastUseDate+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><span class="span-title span-color-title">设备使用用户数：</span><span class="span-content">'+ls.deviceLinkIdCount+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li><li class="three">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><span class="span-title">设备使用代理：</span><span class="span-content">'+port+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><span class="span-title">网络类型：</span><span class="span-content">'+obj.networkType+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li><li class="four">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><span class="span-title">设备越狱（root）：</span><span class="span-content">'+rooted+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><span class="span-title span-color-title">是否安装作弊软件：</span><span class="span-content">'+cheat+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><span class="span-title span-color-title">借贷APP安装数量：</span><span class="span-content">'+obj.appInstalmentCount+'</span></p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>'

            }
        }
    })
})