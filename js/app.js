if (top != self) {
  top.location = self.location;
}
var yc = yc || {};
/**设置tit**/
document.setTitle = function (t) {
  document.title = t;
  var i = document.createElement('iframe');
  i.src = '';
  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
}
/**获取链接参数**/
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
var Id = GetQueryString("gid");
var uid = GetQueryString("uid");
var type = GetQueryString("type");
var cam = GetQueryString("cam");

if (Id == null) {
  Id = '';
}
if (uid == null) {
  uid = 'abcd1234';
}
if (type == null) {
  type = '';
}
if (cam == null) {
  cam = '';
}

/**埋点统计**/
if (type != 'app') {
  var userData = GetQueryString("user");
  var platform = GetQueryString("platform");
  var title = GetQueryString("tit");
  var activityId = GetQueryString("HDid");
  var myUserId = GetQueryString("myUser");
  var activityUrl = window.location.href;
  var fromType = '';
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid) {
    fromType = '1';
  } else if (isiOS) {
    fromType = '0';
  } else {
    fromType = '2';
  }
  if (platform == null) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/QQ/i) == "qq") {
      if (ua.match(/MicroMessenger/i) == "micromessenger") {} else {
        platform = "QQ";
      }
    }
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      platform = "Weixin";
    }
    if (ua.match(/WeiBo/i) == "weibo") {
      platform = "Weibo";
    }
  }
}
/**弹窗**/
function popup(contents) {
  if ($('.alert-tip').length == 0) {
    var html = '<div class="alert-tip">' + contents + '</tip>';
    var div = $(html);
    $('body').append(div);
    setTimeout(function () {
      div.remove();
    }, 2000)
  }
}

/**倒计时**/
var wait = 60;

function time(o) {
  $o = $(o);
  if (wait == 0) {
    $o.removeAttr('disabled', 'disabled');
    $o.val("获取验证码");
    $o.text("获取验证码");
    wait = 60;
  } else {
    $o.attr('disabled', 'disabled');
    $o.val("" + wait + "s");
    $o.text("" + wait + "s");
    wait--;
    $o.addClass('disabled');
    setTimeout(function () {
        time(o)
      },
      1000)
  }
}

/**app内嵌**/
Vue.component('loading', {
  template: '<div class="loadpage"><div class="loading"><div class="loading-head"><em><span></span></em><em><span></span></em><em><span></span></em></div><div class="spinner"><i></i></div></div></div>'
});
Vue.component('err', {
  template: ' <div class="err t-c"><span class="p-a d-i-b"><img src="../h5/images/error.png" class="rotateIn p-a"><em class="d-i-b"></em><h2 class="rubberBand">您访问的页面不存在</h2></span></div>'
});
Vue.component('download', {
  props: ['dsrc'],
  template: ' <div class="download p-f"><a :href="dsrc" class="p-a"><i class="icon-logo d-i-b fl"></i>魔借<label class="d-i-b download-icon fr t-c"><i class="icon-download d-i-b animated-download"></i></label><span class="fr">立即下载</span></a></div>'
});
$(function () {
  res = '';
  downloadApp = '';
  if ($('.productpage').length > 0) {
    var par = {
      "productId": Id,
      "uuid": uid,
      "source": cam,
    }
    ns.ajaxRequest("getProductDetail", par, function (d) {

      Array.prototype.max = function () {
        return Math.max.apply({}, this);
      }
      Array.prototype.min = function () {
        return Math.min.apply({}, this);
      }
      if (d.result == 0) {
        res = d.detail;
        document.setTitle(res.name + '_from魔借APP');
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          downloadApp = '/webapp';
          ios = false;
        } else if (isiOS) {
          downloadApp = '/webapp';
          ios = true;
        } else {
          downloadApp = '/webapp';
          ios = false;
        }
        var date;
        if (res.perio_way == '0') {
          date = (res.periodization).min() + '天-' + (res.periodization).max() + '天'
        } else if (res.perio_way == '1') {
          date = (res.periodization).min() + '月-' + (res.periodization).max() + '月'
        }
        var collected;
          if (uid == 'abcd1234') {
              collected = false
          }else{
              collected =  Boolean(parseInt(res.isCollection))
          }
        var productpage = new Vue({
          el: '.productpage',
          data: {
            token: '',
            uuid: '',
            type: type,
            conditionLists: res.conditionList,
            dataLists: res.dataList,
            periodization: res.periodization,
            interest: res.interest,
            link: res.link,
            logo: res.logo,
            limit: res.money,
            money: '',
            name: res.name,
            allmoneynum: '0.00',
            allinterestnum: '0.00',
            costs: '',
            description: res.description,
            broadcasts: res.radioInfo,
            ison: '',
            ison2: collected,
            deadline: '',
            date2s: res.periodization,
            ios: false,
            ktx_desc: res.ktx_desc,
            productApplyNum: '',
            applyNum: res.applyNum,
            maxAmt: res.money.substring(res.money.indexOf("-") + 1, res.money.length),
            date: date,
            err: false,
            isshare: 0,
            iscollect: collected,
            kind: '',
            downloadApp: downloadApp,
          },
          methods: {
            share: function (e) {
              if (uid == "" || uid == null) {
                window.location = '*share';
              } else {
                if (this.ison == true) {
                  this.ison = false;
                  this.isshare = false;
                } else {
                  this.ison = true;
                  this.isshare = true;
                }
                setTimeout(function () {
                  window.location = '*share';
                }, 1000)
              }
            },
            collect: function (e) {
              if (uid == 'abcd1234') {
                uid = ""
              }
              var par = {
                "type": '0',
                "uuid": uid,
                "collectionId": Id,
              }
              var _this = this;
              ns.ajaxRequest("collection", par, function (d) {
                if (d.result == 0) {
                  if (_this.ison2 == true) {
                    _this.ison2 = false;
                    _this.iscollect = false;
                    _this.kind = 'none';
                  } else {
                    _this.ison2 = true;
                    _this.iscollect = true;
                    _this.kind = 'good';
                  }
                } else {
                  window.location = '*login';
                }
              });
            },
            apply: function (e) {
                var _this = this;
                if (type != "extend") {
                    if (uid == "" || uid == null || uid == 'abcd1234') {
                        window.location = '*login';
                    } else {
                        var par = {
                            "productId": Id,
                            "uuid": uid,
                        }
                        ns.ajaxRequest("addProductApply", par, function (d) {
                            if (d.result == 0) {
                                window.location = _this.link;
                            }
                        });
                    }
                } else {
                    var par = {
                        "productId": Id,
                        "uuid": uid,
                    }
                    ns.ajaxRequest("addProductApply", par, function (d) {
                        if (d.result == 0) {
                            window.location = _this.link;
                        }
                    });

                }
            },
          },
          watch: {
            money: function (newValue, oldValue) {
              var vm = this
              var NnewValue = parseInt(newValue);
              var Ndeadline = parseInt(vm.deadline);
              var Ninterest = parseFloat(vm.interest) / 100;
              var NmaxAmt = parseInt(vm.maxAmt);
              var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
              };
              if (NnewValue < NmaxAmt) {
                var allmoneynum = new CountUp("allmoneynum", 0, NnewValue * Ndeadline * Ninterest + NnewValue, 2, 1, options);
                allmoneynum.start();
                var allinterestnum = new CountUp("allinterestnum", 0, NnewValue * Ndeadline * Ninterest, 2, 1, options);
                allinterestnum.start();
              } else if (NnewValue >= NmaxAmt) {
                vm.money = NmaxAmt;
                var allmoneynum = new CountUp("allmoneynum", 0, NmaxAmt * Ndeadline * Ninterest + NmaxAmt, 2, 1, options);
                allmoneynum.start();
                var allinterestnum = new CountUp("allinterestnum", 0, NmaxAmt * Ndeadline * Ninterest, 2, 1, options);
                allinterestnum.start();
              } else if (isNaN(NnewValue)) {
                var allmoneynum = new CountUp("allmoneynum", 0, 0, 2, 1, options);
                allmoneynum.start();
                var allinterestnum = new CountUp("allinterestnum", 0, 0, 2, 1, options);
                allinterestnum.start();
              }
            },
            deadline: function (newValue, oldValue) {
              var vm = this
              var NnewValue = parseInt(newValue);
              var Nmoney = parseInt(vm.money);
              var Ninterest = parseFloat(vm.interest) / 100;
              var NmaxAmt = parseInt(vm.maxAmt);
              var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
              };
              if (Nmoney < NmaxAmt) {
                var allmoneynum = new CountUp("allmoneynum", 0, NnewValue * Nmoney * Ninterest + Nmoney, 2, 1, options);
                allmoneynum.start();
                var allinterestnum = new CountUp("allinterestnum", 0, NnewValue * Nmoney * Ninterest, 2, 1, options);
                allinterestnum.start();
              } else if (Nmoney >= NmaxAmt) {
                vm.money = NmaxAmt;
                var allmoneynum = new CountUp("allmoneynum", 0, NmaxAmt * NnewValue * Ninterest + NmaxAmt, 2, 1, options);
                allmoneynum.start();
                var allinterestnum = new CountUp("allinterestnum", 0, NmaxAmt * NnewValue * Ninterest, 2, 1, options);
                allinterestnum.start();
              }
            },
          },
          beforeCreate: function () {
            this.loading = false
          },
          mounted: function () {
            this.loading = false;
          }
        })
      } else {
        var productpage = new Vue({
          el: '.productpage',
          data: {
            err: true,
            loading: true,
          },
          mounted: function () {
            this.loading = false
          }
        });
      }

    });
  }
  if ($('.newspage').length > 0) {
    var par = {
      "newsId": Id,
      "uuid": uid
    }

    ns.ajaxRequest("newsDetail", par, function (d) {
      if (d.result == 0) {
        res = d.detail;
        document.setTitle(res.title + '_from魔借APP');
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          downloadApp = '/webapp';
        } else if (isiOS) {
          downloadApp = '/webapp';
        } else {
          downloadApp = '/webapp';
        }
        var hide = ''
        if (res.recommendProductList.length > 0) {
          hide = false;
        } else {
          hide = true
        }
        if (res.isCollection == 0 || uid == 'abcd1234') {
          ison2 = false;
        } else {
          ison2 = true
        }
          if (uid == 'abcd1234') {
              collected = false
          }else{
              collected =  Boolean(parseInt(res.isCollection))
          }
        var newspage = new Vue({
          el: '.newspage',
          data: {
            type: type,
            isloading: false,
            message: '',
            toast: false,
            isajax: false,
            token: '',
            uuid: '',
            content: res.content,
            iscollect: collected,
            newsCreateTime: res.newsCreateTime,
            newsId: res.newsId,
            recommendProductLists: res.recommendProductList,
            tagsLists: res.tagsList,
            title: res.title,
            recommendshow: hide,
            allmoneynum: '',
            allinterestnum: '',
            ison: '',
            ison2: collected,
            downloadApp: downloadApp,
            err: false,
            isshare: 0,
            kind: '',
          },
          methods: {
            share: function (e) {
              if (uid == "" || uid == null) {
                window.location = '*share';
              } else {
                if (this.ison == true) {
                  this.ison = false;
                  this.isshare = false;
                } else {
                  this.ison = true;
                  this.isshare = true;
                }
                setTimeout(function () {
                  window.location = '*share';
                }, 1000)
              }
            },
            collect: function (e) {
              if (uid == 'abcd1234') {
                uid = ""
              }
              var par = {
                "type": '1',
                "uuid": uid,
                "collectionId": Id,
              }
              var _this = this;
              ns.ajaxRequest("collection", par, function (d) {
                if (d.result == 0) {
                  if (_this.ison2 == true) {
                    _this.ison2 = false;
                    _this.iscollect = false;
                    _this.kind = 'none';
                  } else {
                    _this.ison2 = true;
                    _this.iscollect = true;
                    _this.kind = 'good';
                  }
                } else {
                  window.location = '*login';
                }
              });
            },
            back: function (e) {
              window.location = '*back';
            }
          },
          beforeCreate: function () {
            this.loading = false
          },
          mounted: function () {
            this.loading = false;
            if (type == 'app' && uid.length == 0) {
              $('.recommend a').on('click', function () {
                window.location = '*login';
              })
            } else {
              $('.recommend a').each(function () {
                $(this).attr('href', '../h5/products.html?gid=' + $(this).attr('id') + '&type=' + type + '&cam=news')
              })

            }

          }
        })
      } else {
        var newspage = new Vue({
          el: '.newspage',
          data: {
            err: true,
            loading: true,
          },
          mounted: function () {
            this.loading = false
          }
        });
      }

    });
  }
})