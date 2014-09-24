/*
 * 2013新版头尾基础js方法
 * Author: 12040494
 * Date: 2014-05-29
 * */

var SFE = SFE || {};

// 头尾等基础方法，依赖于 jquery
SFE.base = (function ($) {

    var httpType=("https:"==document.location.protocol)?"https":"http";

    // 是否IE6
    var isIE6 = function () {
        return !!window.ActiveXObject && !window.XMLHttpRequest;
    };

    // 安全连接的IE6下iframe的src
    var iframeHttpsSrc = '';
    if (httpType == "https") {
        iframeHttpsSrc = ' src="https://imgssl.suning.com/images/ShoppingArea/Common/blankbg.gif" ';
    }

    // 取 cookie 中的值
    var d = function (b) {
        var a;
        return (a = document.cookie.match(RegExp("(^| )" + b + "=([^;]*)(;|$)"))) ? decodeURIComponent(a[2]
            .replace(/\+/g, "%20"))
            : null
    };

    // 头部工具条展开
    var toolBarOpen = function () {
        $(".tool-link").children("dl.child-node").hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
    };
    // 手机版二维码下拉
    var appDowndloadCode = function () {
        var handle = $("#toolbar_ewm_handle"), box = $("#toolbar_ewm_box"), timer;
        if (0 == handle.size() || 0 == box.size()) {
            return false;
        }
        var showBox = function(){
            handle.addClass("app-link-plus-hover");
            var v = box.find("img[src3]");
            v.each(function() {
                $(this).attr("src", $(this).attr("src3")).removeAttr("src3")
            });
            box.show();
        };
        var hideBox = function(){
            handle.removeClass("app-link-plus-hover");
            box.hide();
        };
        handle.hover(function(){
            clearTimeout(timer);
            showBox();
        }, function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                hideBox();
            }, 200);
        });
        box.hover(function(){
            clearTimeout(timer);
            showBox();
        }, function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                hideBox();
            }, 200);
        });
    };
    // 获取当前环境是sit/pre/prd
    var getEnv = function (_hostName) {
        var ego_pre_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
        var ego_sit_reg = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
        
        if (ego_pre_reg.test(_hostName)) {
            return 'pre';
        }else if (ego_sit_reg.test(_hostName)) {
            return 'sit';
        }
        return 'prd';
    };
   var isRequest = false;
    //获取待评价数量
    var appraiseCount = function () {
        var _hostName = document.location.hostname;//当前域名
        var zoneDomainDir ;
        var box = $("#appraise_count");
        var a = d("logonStatus");
        if (0 == box.size() || a == null || a == "") {
            box.hide();
            return false;
        }
        if(isRequest){
            return false;
        }
        zoneDomainDir = httpType + "://";
        switch (getEnv(_hostName)) {
            case 'pre' :
                zoneDomainDir = zoneDomainDir + 'zonepre.cnsuning.com';
                break;
            case 'sit' :
                zoneDomainDir = zoneDomainDir + 'zonesit.cnsuning.com';
                break;
            case 'prd':
                zoneDomainDir = zoneDomainDir + 'zone.suning.com';
        }
        isRequest = true;
        $.ajax({
            url: zoneDomainDir + "/review/ajax/count_pending_review_num.htm",
            dataType: "jsonp",
            cache: false,
            async: false,
            jsonpCallback: "getReviewCount",
            success: function (data) {
                var num = parseInt(data);
                if (num <= 0) {
                    box.hide();
                } else if (num > 0 && num <= 99) {
                    box.show().find("em").html(num);
                } else {
                    box.show().find("em").html("99+");
                }
            }
        });
    };
    // 头部工具条欢迎词
    var toolBarWelcome = function () {
        var b, a = d("logonStatus");
        if (a != null && a != "") {
            var c = '<span class="g-nick">' + d("nick") + '</span>';
            var h = new Date().getHours();
            c == null && (c = "");
            a == 2 ? b = c : a == 0 ? b = c + '' : a == 1 && (b = c + '');
            b += '<span class="g-level" id="g_level_handle"></span>';
            b += '<a name="index_header_toolbar_0202" href="javascript:SFE.base.logoff();" title="退出" target="_top">退出</a>';
            $("#toolBarWelcome").html(b);
            $("#logReg").hide();
            /*
            * 如果cookie中不存在信息则向服务器查询会员等级信息
            * 否则读取cookie中信息
            * */
            /*
            var wc_ml = d("WC_ML");
            if(wc_ml=="L1"||wc_ml=="L2"||wc_ml=="L3"||wc_ml=="L4"){
                var level; // 0, 1, 2, 3
                var levelText;  // 普通会员 银卡会员 金卡会员 白金卡会员
                switch(wc_ml){
                    case 'L1':
                        level = 0;
                        levelText = '普通会员';
                        break;
                    case 'L2':
                        level = 1;
                        levelText = '银卡会员';
                        break;
                    case 'L3':
                        level = 2;
                        levelText = '金卡会员';
                        break;
                    case 'L4':
                        level = 3;
                        levelText = '白金会员';
                        break;
                }
                var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
                var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
                var _hostName = document.location.hostname;
                    
                sn.amsDomain = "vip.suning.com";
                if (ego_pre.test(_hostName)) {
                    sn.amsDomain = "vippre.cnsuning.com";
                } else if (ego_sit.test(_hostName)) {
                    sn.amsDomain = "vipsit.cnsuning.com";
                }
                var levelDom = '<a id="g_level_icon" name="index_header_toolbar_0201" target="_blank" href="http://'+sn.amsDomain+'/ams-web/custLevel/whatIsCustLevel.htm" class="level level-'+ level +'"></a>';
                levelDom += '<em class="level-tips" id="g_level_text">'+ levelText +'</em>';
                $("#g_level_handle").html(levelDom);
            }*/
            return true;
        }
        return false;
    };
    
    // 会员等级tips
    var levelTips = function () {
        $("body").delegate("#g_level_handle", "mouseover", function () {
            $("#g_level_text").show();
        });
        $("body").delegate("#g_level_handle", "mouseout", function () {
            $("#g_level_text").hide();
        });
    };

    // 登录跳转
    var logonurl = function () {
        if (!toolBarWelcome()) {
            var logonurl = "";
            var callURL = "";
            var targetUrl = "";
            //passport登陆域名
            if(sn.passportLogon==undefined||sn.passportLogon==null){
                var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
                var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
                var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
                var _hostName = document.location.hostname;
                    
                sn.passportLogon = "https://passport.suning.com/ids/login";
                if (ego_pre.test(_hostName)) {
                    sn.passportLogon = "https://passportpre.cnsuning.com/ids/login";
                } else if (ego_sit.test(_hostName)) {
                    sn.passportLogon = "https://passportsit.cnsuning.com/ids/login";
                } else if (ego_dev.test(_hostName)) {
                    sn.passportLogon = "https://passportdev.cnsuning.com/ids/login";
                }
            }
            //连接URL带MyURL
            if (window.location.href.indexOf("&MyURL") != -1) {
                var v3 = window.location.href.substring(window.location.href
                    .indexOf("&MyURL") + 7, window.location.href.length)
                //对于如下请求，跳转回首页
                if ((v3.indexOf("LogonForm") != -1)
                    || (v3.indexOf("SNUserRegister") != -1)
                    || (v3.indexOf("SNUserRegisterView") != -1)
                    || (v3.indexOf("ForgotPasswordView") != -1)
                    || (v3.indexOf("ForgotCardPswView") != -1)
                    || (v3.indexOf("MobileActCode") != -1)
                    || (v3.indexOf("ResetPassword") != -1)
                    || (v3.indexOf("ForgotPasswordCheckMail") != -1)
                    || (v3.indexOf("ForgotPasswordSendMailView") != -1)
                    || (v3.indexOf("ChangeCardPwdWithIdCard") != -1)
                    || (v3.indexOf("SNUserRegisterNormalMobileCmd") != -1)
                    || (v3.indexOf("SNCampusMobileRegisterCmd") != -1)
                    || (v3.indexOf("SNCampusEmailRegisterCmd") != -1)
                    || (v3.indexOf("MbrCardInputView") != -1)
                    || (v3.indexOf("SNMbrCardMergeOptionView") != -1)
                    || (v3.indexOf("SNMbrCardMergeNewAccountView") != -1)
                    || (v3.indexOf("SNMbrCardMergeOtherAccountView") != -1)
                    || (v3.indexOf("SNMbrCardCheckCmd") != -1)
                    || (v3.indexOf("SNMbrCardVerifyMyInfoCmd") != -1)
                    || (v3.indexOf("SNMbrCardMergeNewAccountCmd") != -1)
                    || (v3.indexOf("SNMbrCardMergeOtherAccountCmd") != -1)
                    || (v3.indexOf("SNMbrCardMergeOtherVerifyMobileCmd") != -1)
                    || (v3.indexOf("SNMbrCardMergeOtherVerifyEmailCmd") != -1)
                    || (v3.indexOf("SNMbrCardMergeOtherVerifyNewMobileCmd") != -1)
                    || (v3.indexOf("SNMbrCardMergeCmd") != -1)) {
                    callURL  = encodeURIComponent("http://" + sn.domain + sn.context + "/tcd_" + sn.storeId + "_" + sn.catalogId + "_.html");
                    targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                    logonurl = sn.passportLogon + "?service="
                        + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                        + targetUrl)
                        + "&method=GET&loginTheme=b2c";
                } else {
                    v3  = decodeURIComponent(v3);
                    callURL  = encodeURIComponent(v3);
                    targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                    logonurl = sn.passportLogon + "?service="
                        + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                        + targetUrl)
                        + "&method=GET&loginTheme=b2c";
                }
            } else if (window.location.href.indexOf("&URL") != -1) {
                var v1 = window.location.href.substring(window.location.href
                    .indexOf("&URL") + 5, window.location.href.length);
                if ((v1.indexOf("LogonForm") != -1)
                    || (v1.indexOf("SNUserRegister") != -1)
                    || (v1.indexOf("SNUserRegisterView") != -1)
                    || (v1.indexOf("ForgotPasswordView") != -1)
                    || (v1.indexOf("ForgotCardPswView") != -1)
                    || (v1.indexOf("MobileActCode") != -1)
                    || (v1.indexOf("ResetPassword") != -1)
                    || (v1.indexOf("ForgotPasswordCheckMail") != -1)
                    || (v1.indexOf("ForgotPasswordSendMailView") != -1)
                    || (v1.indexOf("ChangeCardPwdWithIdCard") != -1)
                    || (v1.indexOf("SNUserRegisterNormalMobileCmd") != -1)
                    || (v1.indexOf("SNCampusMobileRegisterCmd") != -1)
                    || (v1.indexOf("SNCampusEmailRegisterCmd") != -1)
                    || (v1.indexOf("MbrCardInputView") != -1)
                    || (v1.indexOf("SNMbrCardMergeOptionView") != -1)
                    || (v1.indexOf("SNMbrCardMergeNewAccountView") != -1)
                    || (v1.indexOf("SNMbrCardMergeOtherAccountView") != -1)
                    || (v1.indexOf("SNMbrCardCheckCmd") != -1)
                    || (v1.indexOf("SNMbrCardVerifyMyInfoCmd") != -1)
                    || (v1.indexOf("SNMbrCardMergeNewAccountCmd") != -1)
                    || (v1.indexOf("SNMbrCardMergeOtherAccountCmd") != -1)
                    || (v1.indexOf("SNMbrCardMergeOtherVerifyMobileCmd") != -1)
                    || (v1.indexOf("SNMbrCardMergeOtherVerifyEmailCmd") != -1)
                    || (v1.indexOf("SNMbrCardMergeOtherVerifyNewMobileCmd") != -1)
                    || (v1.indexOf("SNMbrCardMergeCmd") != -1)) {
                    callURL  = encodeURIComponent("http://" + sn.domain + sn.context + "/tcd_" + sn.storeId + "_" + sn.catalogId + "_.html");
                    targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                    logonurl = sn.passportLogon + "?service="
                        + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                        + targetUrl)
                        + "&method=GET&loginTheme=b2c";
                } else {
                    v1  = decodeURIComponent(v1);
                    callURL  = encodeURIComponent(v1);
                    targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                    logonurl = sn.passportLogon + "?service="
                        + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                        + targetUrl)
                        + "&method=GET&loginTheme=b2c";
                }
            } else {
                var v2 = window.location.href.substring(window.location.href
                    .lastIndexOf("/") + 1, window.location.href.length);
                if ((v2.indexOf("LogonForm") != -1)
                    || (v2.indexOf("SNUserRegister") != -1)
                    || (v2.indexOf("SNUserRegisterView") != -1)
                    || (v2.indexOf("ForgotPasswordView") != -1)
                    || (v2.indexOf("ForgotCardPswView") != -1)
                    || (v2.indexOf("MobileActCode") != -1)
                    || (v2.indexOf("ResetPassword") != -1)
                    || (v2.indexOf("ForgotPasswordCheckMail") != -1)
                    || (v2.indexOf("ForgotPasswordSendMailView") != -1)
                    || (v2.indexOf("ChangeCardPwdWithIdCard") != -1)
                    || (v2.indexOf("SNUserRegisterNormalMobileCmd") != -1)
                    || (v2.indexOf("SNCampusMobileRegisterCmd") != -1)
                    || (v2.indexOf("SNCampusEmailRegisterCmd") != -1)
                    || (v2.indexOf("MbrCardInputView") != -1)
                    || (v2.indexOf("SNMbrCardMergeOptionView") != -1)
                    || (v2.indexOf("SNMbrCardMergeNewAccountView") != -1)
                    || (v2.indexOf("SNMbrCardMergeOtherAccountView") != -1)
                    || (v2.indexOf("SNMbrCardCheckCmd") != -1)
                    || (v2.indexOf("SNMbrCardVerifyMyInfoCmd") != -1)
                    || (v2.indexOf("SNMbrCardMergeNewAccountCmd") != -1)
                    || (v2.indexOf("SNMbrCardMergeOtherAccountCmd") != -1)
                    || (v2.indexOf("SNMbrCardMergeOtherVerifyMobileCmd") != -1)
                    || (v2.indexOf("SNMbrCardMergeOtherVerifyEmailCmd") != -1)
                    || (v2.indexOf("SNMbrCardMergeOtherVerifyNewMobileCmd") != -1)
                    || (v2.indexOf("SNMbrCardMergeCmd") != -1)
                    || (v2.indexOf("SNInterconnectInputView") != -1)
                    || (v2.indexOf("SNInterconnectMergeCheckCmd") != -1)
                    || (v2.indexOf("SNInterconnectMergeNewAccountCmd") != -1)
                    || (v2.indexOf("SNInterconnectMergeOtherAccountCmd") != -1)) {
                    callURL  = encodeURIComponent("http://" + sn.domain + sn.context + "/tcd_" + sn.storeId + "_" + sn.catalogId + "_.html");
                    targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                    logonurl = sn.passportLogon + "?service="
                        + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                        + targetUrl)
                        + "&method=GET&loginTheme=b2c";
                } else {
                    if (window.location.href.substring(
                            window.location.href.lastIndexOf("/") + 1,
                            window.location.href.length).indexOf(
                            "CxnyProductSearch") != -1) {
                        callURL  = encodeURIComponent(window.location.href);
                        targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                        logonurl = sn.passportLogon + "?service="
                            + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                            + targetUrl)
                            + "&method=GET&loginTheme=b2c";
                    } else {
                        if (window.location.href.substring(window.location.href
                            .lastIndexOf("/") + 1, window.location.href.length) == ''
                            &&window.location.href.match("(.*?redbaby.*?)")==null
                            &&window.location.href.match("(.*?binggo.*?)")==null
                            &&window.location.href.match("(.*?pinpai.*?)")==null
                            &&window.location.href.match("(.*?book.*?)")==null) {
                            callURL  = encodeURIComponent("http://" + sn.domain );
                            targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                            logonurl = sn.passportLogon + "?service="
                                + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                                + targetUrl)
                                + "&method=GET&loginTheme=b2c";
                        } else {
                            callURL  = encodeURIComponent(window.location.href);
                            targetUrl= encodeURIComponent("https://" + sn.memberDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);
                            logonurl = sn.passportLogon + "?service="
                                + encodeURIComponent("https://"+sn.memberDomain+"/webapp/wcs/stores/auth?targetUrl="
                                + targetUrl)
                                + "&method=GET&loginTheme=b2c";
                        }
                    }
                }
            }
            hrefLink(logonurl);
        }
    };

    // 退出
    var logoff = function(){
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = "logonStatus=a; expires=" + date.toGMTString();

        window.location = 'https://' + sn.memberDomain + sn.context + '/Logoff?storeId=10052&synPassportFlg=true&URL=SNSendRedirectCmd';
    };

    // 注册跳转
    var registerurl = function () {
        // 注册
        var registerurl = "";
        if (window.location.href.indexOf("&URL") != -1) {
            registerurl = window.location.href.substring(window.location.href
                .indexOf("&URL") + 5, window.location.href.length);
            if ((registerurl.indexOf("LogonForm") != -1)
                || (registerurl.indexOf("SNUserRegisterView") != -1)
                || (registerurl.indexOf("ForgotPasswordView") != -1)
                || (registerurl.indexOf("SNUserRegisterView") != -1)
                || (registerurl.indexOf("ForgotPasswordCheckMail") != -1)
                || (registerurl.indexOf("ForgotPasswordSendMailView") != -1)
                || (registerurl.indexOf("ChangeCardPwdWithIdCard") != -1)) {
                registerurl = "https://"
                    + sn.memberDomain
                    + sn.context
                    + "/SNUserRegisterView?storeId="
                    + sn.storeId
                    + "&catalogId="
                    + sn.catalogId
                    + "&MyURL="
                    + encodeURIComponent("http://" + sn.domain + sn.context
                    + "/tcd_" + sn.storeId + "_" + sn.catalogId
                    + "_.html");
            } else {
                registerurl = "https://" + sn.memberDomain + sn.context
                    + "/SNUserRegisterView?storeId=" + sn.storeId
                    + "&catalogId=" + sn.catalogId + "&MyURL=" + registerurl;
            }
        } else if (window.location.href.indexOf("&MyURL") != -1) {
            var v1 = window.location.href.substring(window.location.href
                .indexOf("&MyURL") + 7, window.location.href.length);
            if ((v1.indexOf("LogonForm") != -1)
                || (v1.indexOf("SNUserRegisterView") != -1)
                || (v1.indexOf("ForgotPasswordView") != -1)
                || (v1.indexOf("SNUserRegisterView") != -1)
                || (v1.indexOf("ForgotPasswordCheckMail") != -1)
                || (v1.indexOf("ForgotPasswordSendMailView") != -1)
                || (v1.indexOf("ChangeCardPwdWithIdCard") != -1)) {
                registerurl = "https://"
                    + sn.memberDomain
                    + sn.context
                    + "/SNUserRegisterView?storeId="
                    + sn.storeId
                    + "&catalogId="
                    + sn.catalogId
                    + "&MyURL="
                    + encodeURIComponent("http://" + sn.domain + sn.context
                    + "/tcd_" + sn.storeId + "_" + sn.catalogId
                    + "_.html");
            } else {
                registerurl = "https://" + sn.memberDomain + sn.context
                    + "/SNUserRegisterView?storeId=" + sn.storeId
                    + "&catalogId=" + sn.catalogId + "&MyURL=" + v1;
            }
        } else if (window.location.href.indexOf("&krypto") != -1) {
            var v1 = window.location.href.substring(window.location.href
                .lastIndexOf("/") + 1, window.location.href.indexOf("&krypto"));
            if ((v1.indexOf("LogonForm") != -1)
                || (v1.indexOf("SNUserRegisterView") != -1)
                || (v1.indexOf("ForgotPasswordView") != -1)
                || (v1.indexOf("SNUserRegisterView") != -1)
                || (v1.indexOf("ForgotPasswordCheckMail") != -1)
                || (v1.indexOf("ForgotPasswordSendMailView") != -1)
                || (v1.indexOf("ChangeCardPwdWithIdCard") != -1)) {
                registerurl = "https://"
                    + sn.memberDomain
                    + sn.context
                    + "/SNUserRegisterView?storeId="
                    + sn.storeId
                    + "&catalogId="
                    + sn.catalogId
                    + "&MyURL="
                    + encodeURIComponent("http://" + sn.domain + sn.context
                    + "/tcd_" + sn.storeId + "_" + sn.catalogId
                    + "_.html");
            } else {
                registerurl = "https://"
                    + sn.memberDomain
                    + sn.context
                    + "/SNUserRegisterView?storeId="
                    + sn.storeId
                    + "&catalogId="
                    + sn.catalogId
                    + "&MyURL="
                    + encodeURIComponent(window.location.href.substring(0,
                    window.location.href.indexOf("&krypto")));
            }
        } else {
            var v2 = window.location.href.substring(window.location.href
                .lastIndexOf("/") + 1, window.location.href.length);
            if ((v2.indexOf("LogonForm") != -1)
                || (v2.indexOf("SNUserRegisterView") != -1)
                || (v2.indexOf("ForgotPasswordView") != -1)
                || (v2.indexOf("SNUserRegisterView") != -1)
                || (v2.indexOf("ForgotPasswordCheckMail") != -1)
                || (v2.indexOf("ForgotPasswordSendMailView") != -1)
                || (v2.indexOf("ChangeCardPwdWithIdCard") != -1)) {
                registerurl = "https://"
                    + sn.memberDomain
                    + sn.context
                    + "/SNUserRegisterView?storeId="
                    + sn.storeId
                    + "&catalogId="
                    + sn.catalogId
                    + "&MyURL="
                    + encodeURIComponent("http://" + sn.domain + sn.context
                    + "/tcd_" + sn.storeId + "_" + sn.catalogId
                    + "_.html");
            } else {
                registerurl = "https://" + sn.memberDomain + sn.context
                    + "/SNUserRegisterView?storeId=" + sn.storeId
                    + "&catalogId=" + sn.catalogId + "&MyURL="
                    + encodeURIComponent(window.location.href);
            }
        }
        hrefLink(registerurl);
    };

    // 加入收藏
    var addFavorite = function () {
        var d = "http://www.suning.com/";
        var c = "苏宁易购-苏宁云商网上商城，领先的综合网上购物商城，正品行货，全国联保，货到付款，让您尽享购物乐趣！";
        if (document.all) {
            window.external.AddFavorite(d, c);
        } else if (window.sidebar) {
            window.sidebar.addPanel(c, d, "");
        } else {
            alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
        }
    };

    // 在线客服
    var onlineService = function () {
        window.open("http://" + sn.online + "/webchat/index.jsp?tabId=0", "webcallpage", "height=530,width=800,directories=no,location=no,scrollbars=yes, resizable=yes, toolbar=no, menubar=no,status=no")
    };

    // 城市专区链接
    var setCityUrl = function() {
        var city = $(".cityUrl") || "9173";
        var cityId =  d("cityId") || "9173";;
        if (city.length > 0) {
            var url;
            var cityArr = [];
            var cityDomain = getCityDomain();
            cityArr["9173"] = "http://nanjing" + cityDomain;
            cityArr["9017"] = "http://beijing" + cityDomain;
            cityArr["9264"] = "http://shanghai" + cityDomain;
            cityArr["9325"] = "http://chongqing" + cityDomain;
            cityArr["9041"] = "http://guangzhou" + cityDomain;
            cityArr["9281"] = "http://tianjin" + cityDomain;
            cityArr["9051"] = "http://shenzhen" + cityDomain;
            cityArr["9254"] = "http://xian" + cityDomain;
            cityArr["9315"] = "http://hangzhou" + cityDomain;
            cityArr["9197"] = "http://shenyang" + cityDomain;
            cityArr["9265"] = "http://chengdu" + cityDomain;
            cityArr["9135"] = "http://wuhan" + cityDomain;
            if (!!cityArr[cityId]) {
                url = cityArr[cityId];
            } else {
                url = cityArr["9173"];
            }
            city.live("mouseover", function () {
                $(this).attr("href", url);
                $(this).removeClass("cityUrl");
            });
        }
    };

    //替换链接中的cityId
    var setSearchCity = function (selector) {
        var city = $(selector);
        if (city != null && city.length > 0) {
            //绑定mouseover事件，替换cityId=xxx
            city.live("mouseover", function () {
                replaceCityParam(this);
            });
            //绑定onclick事件，替换{cityId}占位符，忽略大小写
            city.click(function(){
                replaceCityPlaceHolder(this);
            })
        }
    };
    
    //替换cityId参数cityId=xxx
    function replaceCityParam(obj){
        var cityId =  d("cityId") || "9173";
        var href=$(obj).attr("href");
        //判断是否cityId为最后一个参数，是的话不需要加&,否则要加&
        var split=href.match(/cityId=.*&/gi)==null?"":"&";
        //替换cityId=后面的字符串或数字，直到第一个&或结尾，忽略大小写
        $(obj).attr("href", href.replace(/cityId=.*?&|cityId=.*$/gi, "cityId="+cityId+split));
    }
    
    //替换城市id占位符{cityId}
    function replaceCityPlaceHolder(obj){
        var cityId =  d("cityId") || "9173";
        url = $(obj).attr("href").replace(/{cityId}/gi, cityId).replace(/%7bcityId%7d/gi, cityId);
        $(obj).attr("href", url);
    }

    function getCityDomain() {
        var ego_pre_v7_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
        var ego_sit_v7_reg = /^(\w*)(sit)([1-5].cnsuning.com)$/;

        var _hostName = document.location.hostname;
        var _cityDomain = ".suning.com";
        if (ego_pre_v7_reg.test(_hostName)) {
            _cityDomain = "pre.cnsuning.com";
        } else if (ego_sit_v7_reg.test(_hostName)) {
            _cityDomain = "sit.cnsuning.com";
        }
        return _cityDomain;
    }
    
    //获取搜索支撑系统url
    var  dsservice= function(){
        var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
        var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
        var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
        var _hostName = document.location.hostname;
        var dsservice = "http://ds.suning.cn/ds/";
        if (ego_pre.test(_hostName)) {
            dsservice = "http://dspre.cnsuning.com/ds/";
        } else if (ego_sit.test(_hostName)) {
            dsservice = "http://dssit.cnsuning.com/ds/";
        } else if (ego_dev.test(_hostName)) {
            dsservice = "http://dspre.cnsuning.com/ds/";
        }
        return dsservice;
    };

    // 搜索热门关键词及默认关键词方法
    var getSearchKeyword = function () {
        // 发送查询请求
        var daMain = dsservice() + "hotkeywords/";
        $.ajax({
            url: daMain  + getCategoryId() +"--showHotkeywords" +".xjsonp",
            type: "get",
            dataType: "jsonp",
            jsonpCallback: 'showHotkeywords',  
            success: function (data) {
                try {

                    // 热词
                    var html = data.html.replace("{cityId}", d("cityId"));
                    $("#snKeywordNew").html(html);

                    // 默认搜索词
                    var searchDefaultKeyword = $("#searchDefaultKeyword").val();
                    $("#searchKeywords").val(searchDefaultKeyword);

                } catch (e) {

                }
            }
        });
    };

    // 搜索框焦点事件
    var searchInputEvent = function () {

        // 搜索按钮滑过
        $("#searchSubmit").hover(function () {
            $(this).addClass("search-btn-hover");
        }, function () {
            $(this).removeClass("search-btn-hover");
        });

        // 鼠标焦点事件
        var obj = $("#searchKeywords");
        obj.focus(function () {
            obj.parents(".g-search").addClass("g-search-focus");
            var value = $(this).val(),
            searchDefaultKeyword = $("#searchDefaultKeyword").val() || "";
            if (value == searchDefaultKeyword) {
                obj.val("").css({color: "#000"});
            }
        }).blur(function () {
                obj.parents(".g-search").removeClass("g-search-focus");
                var value = $.trim($(this).val()),
                searchDefaultKeyword = $("#searchDefaultKeyword").val() || "";
                if (value == "") {
                    obj.val(searchDefaultKeyword).css({color: "#999"});
                }
            });
    };

    // 搜索关键词自动完成
    var searchCatalogId = false;
    var searchStoreFlag = false;
    var search_da_djc_index = -1;
    var searchAutoComplete = function () {
        var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
        var obj = $("#searchKeywords");
        var delay = 200, timer, resultBox = $("#ac_results");
        if (resultBox.size() == 0) {
            $('<div class="g-ac-results" id="ac_results" style="display:none;"></div>').appendTo(".g-search");
            resultBox = $("#ac_results");
        }

        // 联想条目鼠标滑过及点击事件
        resultBox.delegate("li", "mouseover",function () {
            $(this).addClass("ac_over").siblings().removeClass("ac_over");
            search_da_djc_index = $(this).index() + 1;
        }).delegate("li", "click", function () {
                if ($(this).attr("categoryid") != "") {
                    searchCatalogId = $(this).attr("categoryid");
                } else {
                    searchCatalogId = false;
                }
                if($(this).hasClass("g-ac-store")){
                    searchStoreFlag = true;
                } else {
                    searchStoreFlag = false;
                }
                obj.val($(this).find(".keyname").text());
                resultBox.hide();
                resultListCurrentIndex = -1;
                $("#searchSubmit").click();
            });

        // 通过键盘选择搜索词
        var resultListCurrentIndex = -1;
        var selectKeywordByKey = function (n) {
            var resultBox = $("#ac_results"),
                results = resultBox.find("li"),
                maxCount = results.size();
            if (resultBox.is("hidden") || results.size() == 0 || Math.abs(n) != 1) {
                return;
            }
            resultListCurrentIndex += n;
            if (resultListCurrentIndex < 0) {
                resultListCurrentIndex = maxCount - 1;
            }
            if (resultListCurrentIndex == maxCount) {
                resultListCurrentIndex = 0;
            }
            search_da_djc_index = resultListCurrentIndex + 1;
            var currentKeywords = results.eq(resultListCurrentIndex);
            results.removeClass("ac_over");
            currentKeywords.addClass("ac_over");
            if (currentKeywords.attr("categoryid")) {
                searchCatalogId = currentKeywords.attr("categoryid");
            } else {
                searchCatalogId = false;
            }
            if(currentKeywords.hasClass("g-ac-store")){
                searchStoreFlag = true;
            } else {
                searchStoreFlag = false;
            }
            obj.val(currentKeywords.find(".keyname").text());
            return false;
        };

        // 按键抬起，向服务端发送请求
        obj.keyup(function (event) {
            if (event.which == 13 || event.which == 38 || event.which == 40) {
                return false;
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                var keyword = $.trim($("#searchKeywords").val());
                if (keyword.length == 0) {
                    resultBox.hide();
                    return false;
                }
                var daMain = dsservice();
                $.ajax({
                    url: daMain + "associate/" + encodeURIComponent(keyword) + "-" +getSearchCategoryId() + "-autoComplateCallback.jsonp",
                    dataType: "jsonp",
                    jsonpCallback : "autoComplateCallback",
                    cache: true,
                    success: function (data) {
                        /*
                        // 无论是否有返回结果，都需要展示店铺搜索 2014-05-27
                        if (data.words.length == 0) {
                            resultBox.hide();
                            resultListCurrentIndex = -1;
                            return false;
                        }
                        */
                        resultBox.show();
                        var resultDom = '<ul>';
                        $(data.words).each(function (key, value) {
                            if (typeof value.categoryName != "undefined") {
                                resultDom += '<li categoryid="' + value.categoryId + '" class="cateSearch">在<b>' + value.categoryName + '</b>分类 中搜索<span style="display:none;" class="keyname">' + value.keyname + '</span></li>'
                            } else {
                                resultDom += '<li><span class="keyname">' + value.keyname + '</span></li>'
                            }
                        });

                        /*
                        * 增加店铺搜索 2014-05-26
                        * */
                        // 截取14个中文字长度后面加...
                        var cutString = function(str, len) {
                            if(str.length*2 <= len) {
                                return str;
                            }
                            var strlen = 0;
                            var s = "";
                            for(var i = 0;i < str.length; i++) {
                                s = s + str.charAt(i);
                                if (str.charCodeAt(i) > 128) {
                                    strlen = strlen + 2;
                                    if(strlen >= len){
                                        return s.substring(0,s.length-1) + "...";
                                    }
                                } else {
                                    strlen = strlen + 1;
                                    if(strlen >= len){
                                        return s.substring(0,s.length-2) + "...";
                                    }
                                }
                            }
                            return s;
                        }
                        var keywordShow = cutString(keyword, 22);
                        resultDom += '<li class="g-ac-store"><i class="icon-store"></i>找“<em>' + keywordShow + '</em>”相关<b>店铺</b><span style="display:none;" class="keyname">' + keyword + '</span></li>';

                        resultDom += '</ul>';
                        resultBox.html(resultDom);
                        resultBox.find(".cateSearch:last").addClass("bottom");
                        resultListCurrentIndex = -1;
                    }
                });
            }, delay);
        }).keydown(function (event) {  // 按键按下，检测是否为上下方向键
                if (event.which == 13) { // 回车键
                    resultBox.hide();
                    resultListCurrentIndex = -1;
                    $("#searchSubmit").click();
                    return false;
                }
                if (event.which == 38) { // 上方向键
                    selectKeywordByKey(-1);
                }
                if (event.which == 40) { // 下方向键
                    selectKeywordByKey(1);
                }
            }).click(function () {
                return false;
            });
        $(document).click(function () {
            resultBox.hide();
            resultListCurrentIndex = -1;
        });
    };

    //获取默认词目录
    function getCategoryId()
    {
        var categoryId = "0";
        if(sn.catalogId == "22001" || window.location.href.match("(.*?10052_22001.*?)")){//图书已有热门关键字
            //图书四级页面
            if(sn.pgFlag == "22001_4"){
                categoryId = sn.searchCategoryId;
            //图书首页  
            }else if(sn.pgFlag == "22001_1"){               
                categoryId = "1";
            //图书二级页面    
            }else if(sn.pgFlag == "22001_2"){   
                categoryId = sn.searchCategoryId;
            }else{
                categoryId = "1";
            }
            if(categoryId == "undefined"){
                categoryId ="1";
            }           
            return categoryId;
        }
        //var url = window.location.href;
        var urlForSug = window.location.href.substring(window.location.href.lastIndexOf("/"));
            if(null !=  urlForSug && ""!=urlForSug){    
                var urlForSugTmp= urlForSug.match("/[A-Za-z]+");
                if(null !=urlForSugTmp && urlForSugTmp[0].match("(^/strd$)|(^/sprd$)|(^/prd$)|(^/ProductDisplay$)|(^/cd$)|(^/pcd$)|(^/wine$)"))
                {
                       if(urlForSugTmp[0].match("(^/strd$)|(^/cd$)"))//三级、二级目录
                       {
                         categoryId=sn.categoryId;
                       }
                       else if(urlForSugTmp[0].match("(^/wine$)"))//酒频道
                       {
                           categoryId="0";  
                       }
                       else if(urlForSugTmp[0].match("(^/pcd$)"))//2.5级页面
                       {
                           categoryId="0";  
                       }else if(urlForSugTmp[0].match("(^/prd$)") || urlForSugTmp[0].match("(^/sprd$)") )//四级目录
                       {
                           categoryId=sn.categoryId;
                       }else//priductdisplay形式的四级目录
                       {
                         categoryId=sn.categoryId;  
                       }
                 }
                //短域名获取默认词
                else if(typeof(sn.pgFlag)!="undefined" && null !=sn.pgFlag)
                    {
                       if(sn.pgFlag == "10051_2")//二级目录
                       {
                         categoryId=sn.categoryId;
                       }
                       else if(sn.pgFlag == "10051_2.5")//2.5级页面
                       {
                           categoryId="0";  
                       }else if(sn.pgFlag == "10051_4")//四级目录
                       {
                           categoryId=sn.categoryId;
                       }
                 }else if(window.location.href.match("(.*?redbaby.*?)")!=null 
                         || window.location.href.match("(.*?14655.*?)")!=null
                         || window.location.href.match("(.*?mysec.*?)")!=null
                         || window.location.href.match("(.*?mytop.*?)")!=null
                         || window.location.href.match("(.*?fashion.*?)")!=null
                         || window.location.href.match("(.*?guide.*?)")!=null)//红孩子母婴页面
                 {
                     categoryId ="2";
                 }else if(window.location.href.match("(.*?binggo.*?)")!=null
                         || window.location.href.match("(.*?14656.*?)")!=null
                         || window.location.href.match("(.*?mztop.*?)")!=null
                         || window.location.href.match("(.*?mzsec.*?)")!=null)//红孩子美妆页面
                 {
                     categoryId ="3";
                 }else if((null !=urlForSugTmp && urlForSugTmp[0].match("(^/tcd$)"))||(urlForSug=="/"))//首页
                 {
                     categoryId ="0";
                 }else if(null != urlForSugTmp && urlForSugTmp[0].match("(^/brandhome$)|(^/brand$)") || ( window.location.href.match("(.*?brand.*?)")!=null ))//品牌旗舰店页面
                 {
                     categoryId ="0";
                 }else
                 {
                     categoryId ="0";
                 }
           }
        if(categoryId == "undefined"){
            categoryId ="0";
        }
        return categoryId;
    }
    //获取联想词目录
    function getSearchCategoryId()
    {
        var categoryId = "0";
        if(sn.catalogId == "22001" || window.location.href.match("(.*?10052_22001.*?)")){
            categoryId ="1";
            return categoryId;
        }
        var urlForSug = window.location.href.substring(window.location.href.lastIndexOf("/"));
            if(null !=  urlForSug && ""!=urlForSug){    
                var urlForSugTmp= urlForSug.match("/[A-Za-z]+");
                if(null !=urlForSugTmp && urlForSugTmp[0].match("(^/strd$)|(^/sprd$)|(^/prd$)|(^/ProductDisplay$)|(^/cd$)|(^/pcd$)|(^/wine$)"))
                {
                    if(sn.newCatalogId == "14655"){
                        categoryId="2";
                    }else if(sn.newCatalogId == "14656"){
                        categoryId="3";
                    }else{
                        categoryId="0";
                    }
                 //短域名获取categoryId  
                 }else if(typeof(sn.pgFlag)!="undefined" && null !=sn.pgFlag){
                     if(sn.newCatalogId == "14655"){
                            categoryId="2";
                        }else if(sn.newCatalogId == "14656"){
                            categoryId="3";
                        }else{
                            categoryId="0";
                        }
                 }
                 else if(window.location.href.match("(.*?redbaby.*?)")!=null 
                         || window.location.href.match("(.*?14655.*?)")!=null
                         || window.location.href.match("(.*?mysec.*?)")!=null
                         || window.location.href.match("(.*?mytop.*?)")!=null
                         || window.location.href.match("(.*?fashion.*?)")!=null
                         || window.location.href.match("(.*?guide.*?)")!=null)//红孩子母婴页面
                 {
                     categoryId ="2";
                 }else if(window.location.href.match("(.*?binggo.*?)")!=null
                         || window.location.href.match("(.*?14656.*?)")!=null
                         || window.location.href.match("(.*?mztop.*?)")!=null
                         || window.location.href.match("(.*?mzsec.*?)")!=null)//红孩子美妆页面
                 {
                     categoryId ="3";
                 }else if((null !=urlForSugTmp && urlForSugTmp[0].match("(^/tcd$)"))||(urlForSug=="/"))//首页
                 {
                     categoryId ="0";
                 }else if(null != urlForSugTmp && urlForSugTmp[0].match("(^/brandhome$)|(^/brand$)") || ( window.location.href.match("(.*?brand.*?)")!=null ))//品牌旗舰店页面
                 {
                     categoryId ="0";
                 }else
                 {
                     categoryId ="0";
                 }
           }

        if(categoryId == "undefined"){
            categoryId ="0";
        }
        return categoryId;
    }

    // 搜索提交
    var onSubmitSearch = function () {
        var obj = $('#searchKeywords');
        var tmp = $.trim(obj.val());
        if (tmp == '') {
            obj.focus();
        } else {
           //这里的sn.searchDomain 需要换成 http://search.suning.com/  图书搜索保持原样不换
            var url = sn.searchDomain.replace("emall/","") +  encodeURIComponent(resolveStr(tmp));
            var cityId = d("cityId") || "9173";
            url += "/cityId=" + cityId;
            if(sn.categoryId == "22001"){  // 图书搜索
                url = sn.searchDomain + "bookSearch.do?keyword=" + encodeURIComponent(tmp);
                url += "&cityId=" + cityId;
            }
            if(sn.categoryId == "253005"){  // 母婴搜索
                url += "&ch=1";
            }
            if(sn.categoryId == "26001"){  // 美妆搜索
                url += "&ch=2";
            }
            if (typeof searchCatalogId != "undefined" && searchCatalogId != "") {
                url += "&ci=" + searchCatalogId;
            }
            // 店铺搜索 2014-05-26
            if ( searchStoreFlag ) {
                url = sn.searchDomain.replace("emall/", "") + "shop/search.do?app=shopsearch&keyword=" + encodeURIComponent(tmp);
            }
            /*
            * 点击统计代码 pangnate 20140901
            * */
            var RSC = $('.g-ac-store').find('em').eq(0).text();
            var LXC = tmp;
            var name = 'YT_' + LXC + '_'+ RSC + '_' + search_da_djc_index;
            var dom = $('<a href="###" name="' + name + '"></a>')[0];
            sa.click.sendDatasIndex(dom);
            
            window.location.href = url;
        }
        return false;
    };
    
    function resolveStr(str){
    str = str.replace(/\-/g,"%2d");
    str = str.replace(/\&/g,"%26");
    str = str.replace(/\./g,"%2E");
    str = str.replace(/\+/g,"%2B");
    return str;
    }

    /*************************************** 2014-04 迷你购物车 [[ ***********************************/

    /********************************************
     * 以下部分定义页面元素或需要使用的动态DOM元素
     * *****************************************/
    // 加载状态标记
    var cartLoadingStatus = false;
    // 悬浮状态标记
    var cartFixedStatus = false;
    // 购物车是否展开状态
    var cartOpen = false;
    // 登录状态
    var logonStatus = d("logonStatus");
    // 迷你购物车加载中DOM
    var cartLoadingDom = '<div class="g-cart-list-default"><p class="g-cartLoading" id="loadingId">' +
        '<span class="g-cart-loading"></span>正在努力加载，请稍侯...' +
        '</p></div>';
    // 未登录状态下迷你购物车为空
    var cartEmptyDom = '<div class="g-cart-list-default"><dl class="clearfix"><dt></dt><dd><p>' +
        '您的购物车是空的<br>如您已添加过商品，' +
        '可<a name="index_minicart_1512" href="javascript:SFE.base.logonurl();">登录</a>后查看' +
        '</p></dd></dl></div>';
    // 登录状态下迷你购物车为空
    if (logonStatus) {
        cartEmptyDom = '<div class="g-cart-list-default"><dl class="clearfix"><dt></dt><dd class="g-oneline-text">您的购物车是空的，赶紧选购吧</dd></dl></div>';
    }
    // 未登录且购物车为空时悬浮DOM
    var fixedUnloginEmptyDom = '<div class="g-small-cartbtn" onclick="SFE.base.logonurl();">' +
        '<span class="g-small-cart-num">0</span>' +
        '<span class="g-small-cart-text">购物车</span>' +
        '<span class="g-small-cart-icon"></span>' +
        '<em class="g-small-line"></em></div>';

    // 刷新迷你购物车数字
    var miniCartReload = function(){
        var itemLength = d("totalProdQty") || 0;
        $("#showTotalQty").text(itemLength);
        if (itemLength != 0) {
            //invokeMiniCart();  // 性能优化直接屏蔽 2014-08-06
        }
    };

    // 如果总价超过千亿级别，则单位自动转化成万
    var priceUnitConvert = function(totalPrice) {
        if(totalPrice.length >= 15) {
            return (parseFloat(totalPrice) / 10000).toFixed(2) + "万";
        } else {
            return totalPrice;
        }
    };
    
    //sa埋点
    var saFn = function() {
        sa.click.sendDatasIndex(this);
    }
    // "购物车"链接已由home.js中的代码绑定了埋点事件
    $("a[name='index_minicart_1502']").bind("click", saFn); // 去结算
    $("input[name='index_minicart_1503']").bind("click", saFn); // 全选
    $("a[name='index_minicart_1506']").bind("click", saFn); // 批量删除

    // 购物车交互
    var invokeMiniCart;
    var invokeFlag = true;
    var minCartEvent = function () {

        // 迷你购物车事件代理容器
        var topDom = $("body");
        // 迷你购物车最外层容器
        var cartWrapper = $("#myCart");
        if(cartWrapper.size()==0){
            return false;
        }

        // 迷你购物车主体容器
        var cartListBox = $("#snCartListWrapper");
        // 迷你购物车内列表容器
        var cartListInner = $("#snCartList");
        // 迷你购物车数字容器
        var cartNumBox = $("#showTotalQty");
        // 购物车默认商品数量
        var oldNum = 0;
        // 悬浮时的外围容器
        var snCartFixed = $("#snCartFixed");
        // 悬浮时的外围容器
        var cartTitle = $(".g-cart-title");
        // 悬浮时的外围容器
        var cartBottom = $(".g-cart-bottom");
        // 删除确认框
        var g_cart_del_confirm = $("#g_cart_del_confirm");

        // 查询购物车内容
        invokeMiniCart = function (openCart) {
            
            if(!invokeFlag) {
                return false;
            }
            
            var flag = typeof openCart == "undefined" ? false : true;
            var quantity = d("totalProdQty") || 0;
            // 悬浮状态切数量未发生改变，拉开动作
            if ( cartFixedStatus == true && flag == true && $("#snCartFixed").find(".g-cart-table").size() != 0 && quantity == oldNum) {
                // 显示相应元素并调整高度
                $("#J_cart_slide_arr").hide();
                if(quantity == 0) {
                    cartTitle.hide();
                } else {
                    cartTitle.show();
                }
                $(".g-cart-bottom").show();
                cartListInner.show();
                var wrapper = $(".g-cart-slide-wrapper");
                var targetHeight = $("#snCartList").height();
                oldNum != 0 ? targetHeight += 30 : null;
                wrapper.stop().animate({height: targetHeight, opacity:1});
                return false;
            }

            try{
                $("#J_cart_slide_arr").hide();
                if(flag){
                    if (cartFixedStatus == true) {
                        $(".g-cart-slide-wrapper").stop().animate({height:92});
                    } else {
                        cartBottom.hide();
                    }
                    cartListInner.show().html(cartLoadingDom);
                    cartTitle.hide();
                    if(cartFixedStatus == false) {
                        cartBottom.hide();
                    } else {
                        cartBottom.show();
                    }
                }
                var url = httpType + "://" + sn.domain + sn.context + "/MiniCartSearchView?catalogId=" + sn.catalogId + "&storeId=" + sn.storeId;
                $.ajax({
                    type: "get",
                    dataType: "jsonp",
                    url: url,
                    success: function (data) {
                        cartOpen = openCart;
                        cartLoadingStatus = true;
                        $("#J_cart_slide_arr").hide();

                        // 如果存在选中的商品，则显示批量删除按钮
                        if ( typeof data.selectedNumber != "undefined" && data.selectedNumber > 0) {
                            $(".g-cart-del-batch").show();
                        } else {
                            $(".g-cart-del-batch").hide();
                        }

                        if (data.totalNumber == 0) {
                            cartTitle.hide();
                            if(flag){
                                cartListInner.show().html(cartEmptyDom);
                                if( cartFixedStatus == false ){
                                    cartBottom.hide();
                                } else {
                                    cartBottom.show();
                                }
                                
                                // 展示总数、已选数量、价格
                                $(".J_cart_total_num").text(0);
                                $(".J_cart_selected_num").text(0);
                                $(".J_cart_selected_money").text("0.00");
                            }
                        } else {
                            if (isIE6()) {
                                data.html = '<iframe class="cartMask"' + iframeHttpsSrc + '></iframe>' + data.html;
                            }
                            if(flag){
                                cartListInner.show().html(data.html);
                                cartTitle.show();
                                if( cartFixedStatus == false ){
                                    cartBottom.show();
                                }
                            } else if( cartFixedStatus == true ) {
                                // 将顶部的DOM移动至底部
                                var targetDom = $("#snCartFixed");
                                var fromDom = $("#snCartListWrapper");
                                //targetDom.css({opacity:0});
                                fromDom.children().appendTo(targetDom);
                                fromDom.empty();
                                $(".g-cart-slide-wrapper").css({height:0});
                                cartBottom.show();

                                // 隐藏按钮
                                if( !cartFixedStatus ){
                                    $(".g-small-cartbtn").hide();
                                }
                                $(".g-cart-list").show();

                                targetDom.stop().animate({opacity:1});
                            }

                            // 缓存现有数量
                            if(flag){
                                oldNum = d("totalProdQty") || 0;
                            }

                            // 展示总数、已选数量、价格
                            $(".J_cart_total_num").text(data.totalNumber);
                            $(".J_cart_selected_num").text(data.selectedNumber);
                            //$(".J_cart_selected_money").text(priceUnitConvert(data.amount));
                            
                            // 如果选中的数量大于0，则异步请求应付总金额（包含运费）
                            if(data.selectedNumber > 0) {
                                $.ajax(
                                {
                                    url : httpType + "://" + sn.domain + sn.context + "/SNCartOperationCmd",
                                    data : 'method=calculateFreight&freightRequestJson=' + data.freightRequestJson,
                                    dataType: "jsonp",
                                    success : function (data) {
                                        // 商品应付总金额（自营 + C店），包含运费
                                        $(".J_cart_selected_money").text(priceUnitConvert(data.totalPay));
                                    }
                                });
                            }

                            if(data.totalNumber == data.selectedNumber) {
                                $("#J_cart_checked_all").attr("checked", true);
                            } else {
                                $("#J_cart_checked_all").attr("checked", false);
                            }
                        }

                        // 悬浮状态时显示相应元素并调整高度
                        if (cartFixedStatus == true && flag == true) {
                            var wrapper = $(".g-cart-slide-wrapper");
                            var targetHeight = $("#snCartList").height();
                            data.totalNumber != 0 ? targetHeight += 30 : null;
                            wrapper.stop().animate({height: targetHeight, opacity:1});
                        }
                        if(flag == true){
                            if(data.totalNumber == 0) {
                                cartTitle.hide();
                            } else {
                                cartTitle.show();
                            }
                            $(".g-cart-bottom").show();
                        }
                    },
                    error: function () {
                        cartOpen = true;
                        cartLoadingStatus = true;
                        cartListInner.html(cartEmptyDom);
                        cartTitle.hide();
                        cartBottom.show();
                    },
                    complete : function() {
                        invokeFlag = true;
                        
                        //ga监控
                        //$("a[name^=index_minicart_],input[name^=index_minicart_]").unbind("click", saFn).bind("click", saFn);
                        $(".g-cart-list-bg") .find("a[name^=index_minicart_],input[name^=index_minicart_]").unbind("click", saFn).bind("click", saFn);
                    }
                });
            }catch(e){};
            
            invokeFlag = false;
        };

        // 初始化数字
        miniCartReload();

        // 鼠标悬浮于头部迷你购物车标签
        var timer;
        var cartWrapper = $("#myCart");
        cartWrapper.mouseenter(function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                /*if(cartLoadingStatus == true){
                    return false;
                }*/

                // 移动DOM到顶部
                var bottomDom = $("#snCartFixed").find(".g-cart-list");
                cartListInner.show();
                if( bottomDom.size() != 0 ){
                    var targetDom = $("#snCartListWrapper");
                    bottomDom.appendTo(targetDom);
                    //cartListInner.show();
                }

                var quantity = d("totalProdQty") || 0;
                if (quantity == 0) {
                    cartListInner.html(cartEmptyDom);
                    cartTitle.hide();
                    cartBottom.hide();
                    $(".J_cart_total_num").text(0);
                    $(".J_cart_selected_num").text(0);
                    $(".J_cart_selected_money").text("0.00");
                }else {
                    if (quantity != oldNum) {
                        oldNum = quantity;
                        cartNumBox.text(quantity);
                        cartListInner.html(cartLoadingDom).attr("rel", "cartLoadingDom");
                        cartTitle.hide();
                        cartBottom.hide();
                        invokeMiniCart(true);
                    } else {
                        if (quantity == 0) {
                            oldNum = 0;
                            if(cartListInner.attr("rel")=="cartEmptyDom"){
                                return false;
                            }
                            cartListInner.html(cartEmptyDom).attr("rel", "cartEmptyDom");
                            cartTitle.hide();
                            cartBottom.hide();
                            $(".J_cart_total_num").text(0);
                            $(".J_cart_selected_num").text(0);
                            $(".J_cart_selected_money").text("0.00");
                        } else if( $(".g-cart-table").size() == 0 ) {
                            invokeMiniCart(true);
                        }
                    }
                }
                $(".g-cart-list").show();
                $(".g-small-cartbtn").hide();
                cartWrapper.addClass("g-min-cart-hover");
                $(".g-cart-slide-wrapper").height("auto");
                cartListBox.show();
                if(quantity==0){
                    cartBottom.hide();
                } else if(invokeFlag){
                    cartTitle.show();
                    cartBottom.show();
                }
                cartOpen = true;
                cartLoadingStatus = true;
            }, 200);
        }).mouseleave(function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    cartWrapper.removeClass("g-min-cart-hover");
                    if(cartFixedStatus==false){
                        cartListBox.hide();
                    }
                    hideConfirm();
                    cartOpen = false;
                    cartLoadingStatus = false;
                    cartFixedStatus = false;
                    cartListInner.attr("rel", "");
                }, 200);
            });

        // 绑定鼠标悬浮或离开列表区域
        topDom.delegate(".J_mincart_mouseover", "mouseover",function () {
            var hasEnd = $(this).hasClass("g-cart-sale-end");  // 是否已经结束
            var numShow = $(this).find(".g-cart-cout-text");  // 纯数字
            var numChange = $(this).find(".g-cart-cout");  // 微调控件
            var closeBtn = $(this).find(".g-cart-del-handle"); // 删除按钮
            if(!$(this).hasClass("g-cart-sale-end") && !$(this).hasClass("g-cart-packege-sale-end") && !$(this).hasClass("J_mincart_plus_disabled")){
                numShow.hide();
                numChange.show();
            }
            closeBtn.css({visibility: "visible"});
        }).delegate(".J_mincart_mouseover", "mouseleave", function () {
                var numShow = $(this).find(".g-cart-cout-text");  // 纯数字
                var numChange = $(this).find(".g-cart-cout");  // 微调控件
                var closeBtn = $(this).find(".g-cart-del-handle").not(".has-click"); // 删除按钮

                numShow.show();
                numChange.hide();
                closeBtn.css({visibility: "hidden"});
                numChange.blur();
            });

        // 数量增减
        var limit = {start: 1, end: 99};
        topDom.delegate(".g-cart-cout-btnl", "click",function () {  // 左按钮
            var numInput = $(this).siblings(".g-cart-cout-input");
            var numShow = $(this).parent().siblings(".g-cart-cout-text");  // 纯数字
            var leftBtn = $(this), rightBtn = $(this).siblings(".g-cart-cout-btnr");
            var targetNum = parseInt(numInput.val()) - 1;
            if (targetNum >= limit.start) {
                numInput.val(targetNum);
                numShow.text(targetNum);
                updateQuantity($(this));
            }
            changeBtnStatus(leftBtn, rightBtn, targetNum);
        }).delegate(".g-cart-cout-btnr", "click",function () {  // 右按钮
                var numInput = $(this).siblings(".g-cart-cout-input");
                var numShow = $(this).parent().siblings(".g-cart-cout-text");  // 纯数字
                var rightBtn = $(this), leftBtn = $(this).siblings(".g-cart-cout-btnl");
                var targetNum = parseInt(numInput.val()) + 1;
                if (targetNum <= limit.end) {
                    numInput.val(targetNum);
                    numShow.text(targetNum);
                    updateQuantity($(this));
                }
                changeBtnStatus(leftBtn, rightBtn, targetNum);
            }).delegate(".g-cart-cout-input", "keyup",function (event) {
                var temp = $(this).val();
                if (event.which == 8 && temp == "") {
                    return false;
                } else if (event.which == 13 || event.which == 38 || event.which == 37 || event.which == 39 || event.which == 40) {
                    return false;
                } else {
                    keybordOrMouseEvent($(this));
                }
            }).delegate(".g-cart-cout-input", "mouseup",function () {
                keybordOrMouseEvent($(this));
            }).delegate(".g-cart-cout-input", "blur", function () {
                keybordOrMouseEvent($(this));
                updateQuantity($(this));
            });

        // 键盘或鼠标更改数量
        function keybordOrMouseEvent(obj) {
            var targetNum = $(obj).val().replace(/\D/g, '');
            if (targetNum < limit.start) {
                targetNum = limit.start;
            } else if (targetNum > limit.end) {
                targetNum = limit.end;
            }
            var rightBtn = $(obj).siblings(".g-cart-cout-btnr");
            var leftBtn = $(obj).siblings(".g-cart-cout-btnl");
            var numShow = $(obj).parent().siblings(".g-cart-cout-text");

            $(obj).val(targetNum);
            numShow.text(targetNum);
            changeBtnStatus(leftBtn, rightBtn, targetNum);
        }

        // 改变加减按钮状态
        function changeBtnStatus(leftBtn, rightBtn, targetNum) {
            if (targetNum < limit.end) {
                rightBtn.removeClass("g-cart-cout-btnr-disabled");
            } else {
                rightBtn.addClass("g-cart-cout-btnr-disabled");
            }
            if (targetNum <= limit.start) {
                leftBtn.addClass("g-cart-cout-btnl-disabled");
            } else {
                leftBtn.removeClass("g-cart-cout-btnl-disabled");
            }
        }

        // 加减数量事件
        function updateQuantity(obj) {
            var td = $(obj).parents(".J_mincart_mouseover");
            // 如果是配件套餐，itemId是以逗号分隔的，如果传到后台，匹配不到对应的itemId，不会进行库存校验，即便校验了，迷你购物车也没有报错位
            var itemId = td.find(".g-cart-del-handle").attr("exdata");
            var all = topDom.find(".J_mincart_mouseover").not(".g-cart-sale-end");
            var quantityStr = "";
            $.each(all, function(i, n) {
                var id = $(n).find(".g-cart-del-handle").attr("exdata");
                var idArr = id.split(",");
                var quantity = $(n).find(".g-cart-cout-input").val();
                if(idArr.length > 1) {
                    for(var j = 0; j < idArr.length; j++) {
                        quantityStr += idArr[j] + "=" + quantity;
                        if(idArr.length != (j + 1)) {
                            quantityStr += ";;";
                        }
                    }
                } else {
                    quantityStr += id + "=" + quantity;
                }
                if(all.length != (i + 1)) {
                    quantityStr += ";;";
                }
            });
            var params = "method=updateQuantity&prodQuantity=" + quantityStr + "&itemId="+itemId;
            $.ajax({
                type: "get",
                dataType: "jsonp",
                url : httpType + "://" + sn.domain + sn.context + "/SNCartOperationCmd",
                data : params,
                success : function (m) {
                    //if (m.result == "success") { // 此处去除是否成功的判断，不管成功失败，都不影响修改数量
                        // 更新商品总件数
                        $(".J_cart_total_num").text(m.totalQty);
                        // 更新已勾选商品总数
                        $(".J_cart_selected_num").text(m.totalProductQty);
                        // 更新已勾选的商品总价（勾选商品的总价 + 阳光包总价（隐藏） + 运费 - 优惠）
                        if (m.totalPrice == "") m.totalPrice = "0";
                        if (m.totalDiscount == "") m.totalDiscount = "0";
                        if (m.totalShipCharge == "") m.totalShipCharge = "0";
                        var realTotalPrice = parseFloat(m.totalPrice) + parseFloat(m.totalShipCharge) - parseFloat(m.totalDiscount);
                        $(".J_cart_selected_money").text(priceUnitConvert(realTotalPrice.toFixed(2)));
                    //}
                }
            });
        }
        
        function doSelectItem(itemIds, status) {
            $.ajax({
                type: "get",
                dataType: "jsonp",
                url: httpType + "://" + sn.domain + sn.context + "/SNCartOperationCmd?method=doSelectForItem&itemIds=" + itemIds + "&itemStatus=" + status + "&ts=" + new Date().getTime(),
                success: function (m) {
                    if (m.result == "success") {
                        // 更新已勾选商品总数
                        $(".J_cart_selected_num").text(m.totalProductQty);
                        // 更新已勾选的商品总价（勾选商品的总价 + 阳光包总价（隐藏） + 运费 - 优惠）
                        if (m.totalPrice == "") m.totalPrice = "0";
                        if (m.totalDiscount == "") m.totalDiscount = "0";
                        if (m.totalShipCharge == "") m.totalShipCharge = "0";
                        var realTotalPrice = parseFloat(m.totalPrice) + parseFloat(m.totalShipCharge) - parseFloat(m.totalDiscount);
                        $(".J_cart_selected_money").text(priceUnitConvert(realTotalPrice.toFixed(2)));
                    }
                }
            });
        }

        // 全选
        topDom.delegate("#J_cart_checked_all", "click", function () {
            var isChecked = $(this).is(":checked");
            var boxListDom = $(".g-cart-table").find(":checkbox").not(":disabled");
            if (isChecked == true) {
                boxListDom.attr("checked", true);
                $(".g-cart-del-batch").show();
            } else {
                boxListDom.attr("checked", false);
                $(".g-cart-del-batch").hide();
            }
            var itemIds = "";
            var status = "";
            $.each(boxListDom, function(i, n) {
                var td = $(n).parents(".J_mincart_mouseover");
                
                var id = td.find(".g-cart-del-handle").attr("exdata");
                var idArr = id.split(",");
                // 配件套餐传的是以逗号分隔的多个itemId，勾选时只需传主商品的itemId
                if(idArr.length > 1) {
                    id = idArr[0];
                }
                itemIds += id + ",";
                if(isChecked) {
                    status += "1" + ",";
                } else {
                    status += "0" + ",";
                }
            });
            doSelectItem(itemIds, status);
        });

        // 行项目选中
        topDom.delegate(".g-cart-table :checkbox", "click", function () {
            if ($(this).not(":checked")) {
                $("#J_cart_checked_all").attr("checked", false);
            }
            var boxListDom = $(".g-cart-table").find(":checkbox").not(":disabled");
            var allChecked = true;
            var allNotChecked = true;
            boxListDom.each(function(){
                if ($(this).is(":checked")) {
                    allNotChecked = false;
                } else {
                    allChecked = false;
                }
            });
            if(allChecked==true){  // 全部勾选
                $("#J_cart_checked_all").attr("checked", true);
                $(".g-cart-del-batch").show();
            }
            if (allNotChecked) {  // 全部未勾选
                $(".g-cart-del-batch").hide();
            } else {
                $(".g-cart-del-batch").show();
            }

            var itemIds = "";
            var status = "";
            $.each(boxListDom, function(i, n) {
                var td = $(n).parents(".J_mincart_mouseover");
                var id = td.find(".g-cart-del-handle").attr("exdata");
                var idArr = id.split(",");
                // 配件套餐传的是以逗号分隔的多个itemId，勾选时只需传主商品的itemId
                if(idArr.length > 1) {
                    id = idArr[0];
                }
                itemIds += id + ",";
                status += ($(n).attr("checked") ? "1" : "0") + ","
            });
            doSelectItem(itemIds, status);
        });

        // 删除确认
        var delFlag = null;
        topDom.delegate(".g-cart-del-handle", "click", function () {

            // 点击时保存变量用于删除DOM操作
            if ($(this).hasClass("g-cart-del-batch")) {
                delFlag = 'batch';
            } else {
                delFlag = $(this).parent();
            }

            $(this).addClass("has-click");
            var confirmBox = {width: 148, height: 68};
            var confirmDialog = $("#g_cart_del_confirm");
            confirmDialog.show();
            // 定位
            var cartOffset = $(".g-cart-slide-wrapper").offset();
            var offset = $(this).offset();
            var pLeft = offset.left - cartOffset.left, pTop = offset.top - cartOffset.top;
            var oWidth = $(this).width(), oHeight = $(this).height();
            if (!$(this).hasClass("g-cart-del-batch")) {
                oHeight += 6;
            }
            var pos = {left: 0, top: 0};
            pos.left = pLeft + oWidth / 2 - confirmBox.width + 24;
            pos.top = pTop + oHeight;
            confirmDialog.css(pos);

        });
        
        topDom.delegate(".g-cart-del-ok", "click", function () {

            // 进行DOM删除判断
            if( delFlag == null ){ // 无任何操作

            } else if( delFlag == "batch" ){ // 批量删除
                var checkList = $(".g-cart-table").find("input[type='checkbox']:checked");
                var itemIds = "";
                $.each(checkList, function(i, n) {
                    var td = $(n).parents(".J_mincart_mouseover");
                    var itemId = td.find(".g-cart-del-handle").attr("exdata");
                    // 配件套餐传的是以逗号分隔的多个itemId，删除时只需传主商品的itemId
                    var itemIdArr = itemId.split(",");
                    if(itemIdArr.length > 1) {
                        itemId = itemIdArr[0];
                    }
                    itemIds += itemId + ",";
                });
                $.ajax({
                    type: "get",
                    dataType: "jsonp",
                    url: httpType + "://" + sn.domain + sn.context + "/SNCartOperationCmd?method=batchDeleteItem&itemIds=" + itemIds + "&ts=" + new Date().getTime(),
                    success: function (data) {
                        checkList.each(function(){
                            var td = $(this).parents(".J_mincart_mouseover");
                            td.animate({opacity:0}, function(){
                                td.remove();
                                checkCartLength();
                            });
                        });
                        delFlag = null;
                    }
                });
            } else {  // 单个删除
                var td = $(delFlag).parents(".J_mincart_mouseover");
                var itemId = td.find(".g-cart-del-handle").attr("exdata");
                // 配件套餐传的是以逗号分隔的多个itemId，删除时只需传主商品的itemId
                var itemIdArr = itemId.split(",");
                if(itemIdArr.length > 1) {
                    itemId = itemIdArr[0];
                }
                $.ajax({
                    type: "get",
                    dataType: "jsonp",
                    url: httpType + "://" + sn.domain + sn.context + "/SNCartOperationCmd?method=deleteItem&itemId=" + itemId + "&ts=" + new Date().getTime(),
                    success: function (data) {
                        td.animate({opacity:0}, function(){
                            td.remove();
                            checkCartLength();
                        });
                        delFlag = null;
                    }
                });
            }

            // 检查购物车商品数量，为0时修改购物车状态
            var checkCartLength = function(){
                var quantity = d("totalProdQty") || 0;
                $(".g-cart-slide-wrapper").css({height:"auto"});
                if( quantity==0 ){
                    setTimeout(function(){
                        cartListInner.html(cartEmptyDom);
                        cartTitle.hide();
                        if( cartFixedStatus == false ){
                            cartBottom.hide();
                        } else {
                            cartBottom.show();
                            if(!logonStatus && cartFixedStatus == true){
                                var checkBtnLength = $("#snCartFixed").find(".g-small-cartbtn").size();
                                if(checkBtnLength==0){
                                    $("#snCartFixed").append(fixedUnloginEmptyDom);
                                }
                                var bottomDom = $("#snCartFixed").find(".g-cart-list");
                                bottomDom.hide();
                            }
                        }
                        // 展示总数
                        $(".J_cart_total_num").text(0);
                        $(".J_cart_selected_num").text(0);
                        $(".J_cart_selected_money").text("0.00");
                    }, 10);
                } else if(cartFixedStatus == true) {
                    invokeMiniCart(true);
                }
            };

            hideConfirm();
        });
        topDom.delegate(".g-cart-del-cancl", "click", function () {
            hideConfirm();
        });

        // 隐藏确认框
        var hideConfirm = function () {
            $("#g_cart_del_confirm").remove();
            g_cart_del_confirm.hide();
            $(".g-cart-list").append(g_cart_del_confirm);
            $("#snCartList").find(".g-cart-del-handle").not(".g-cart-del-batch").removeClass("has-click").css({visibility: "hidden"});
            delFlag = null;
        };

        // 内容滚动时需要隐藏确认框
        $(".g-cart-list-bg").scroll(function () {
            hideConfirm();
        });

        // 垂直方向收起悬浮购物车
        var minCartSlideDown = function () {
            hideConfirm();
            var wrapper = $(".g-cart-slide-wrapper");
            wrapper.stop().animate({height: 0}, function () {
                $("#J_cart_slide_arr").hide();
                cartOpen = false;
                cartLoadingStatus = false;
            });
        };

        // 垂直方向展开悬浮购物车
        var minCartSlideUp = function () {
            setTimeout(function () {
                if ($("body").data("clickMinCartBottom") == true) {
                    return false;
                } else {
                    invokeMiniCart(true);
                    cartOpen = true;
                }
            }, 30);
        };

        var ArrTimer = null;

        // 显示小箭头
        var minCartShowArr = function () {
            var wrapper = $(".g-cart-slide-wrapper");
            $("#snCartList").hide();
            $(".g-cart-title").hide();
            $("#snCartList").hide();
            wrapper.stop().animate({height: 8}, function () {
                $("#J_cart_slide_arr").fadeIn(function() {
                    setTimeout(function() {
                        /*$("#snCartList").show();
                        $(".g-cart-title").show();*/
                        $("#snCartList").show();
                    }, 400);  // 600
                });
            });
        };

        // 隐藏小箭头
        var minCartHideArr = function () {
            ArrTimer = setTimeout(function () {
                $("#J_cart_slide_arr").hide();
                $(".g-cart-title").hide();
                $("#snCartList").hide();
                var wrapper = $(".g-cart-slide-wrapper");
                wrapper.stop().animate({height: 0}, function () {
                    $("#J_cart_slide_arr").hide();
                });
            }, 200);
        };

        // 开始悬浮
        var minCartFixed = function () {

            cartOpen = false;
            cartLoadingStatus = false;
            cartFixedStatus = true;

            // 为空且未登录
            var quantity = d("totalProdQty") || 0;
            if( !logonStatus && quantity==0 && cartFixedStatus == true ){
                snCartFixed.html(fixedUnloginEmptyDom).stop().animate({opacity:1});
            } else {
                var targetDom = $("#snCartFixed");
                var fromDom = $("#snCartListWrapper");
                targetDom.css({opacity:0});
                fromDom.children().appendTo(targetDom);
                fromDom.empty();
                $(".g-cart-slide-wrapper").css({height:0});
                cartBottom.show();
                targetDom.stop().animate({opacity:1});
            }
        };

        // 结束悬浮
        var minCartStatic = function(){
            cartOpen = false;
            cartLoadingStatus = false;
            cartFixedStatus = false;

            var quantity = d("totalProdQty") || 0;
            if( !logonStatus && quantity==0 ){
                $("#snCartFixed").stop().animate({opacity:0}, function(){
                    var targetDom = $("#snCartListWrapper");
                    var fromDom = $("#snCartFixed");
                    fromDom.children().appendTo(targetDom);
                    fromDom.empty();
                    $(".g-small-cartbtn").remove();  // 移除登录按钮
                });
            } else {
                $("#snCartFixed").stop().animate({opacity:0}, function(){
                    var targetDom = $("#snCartListWrapper");
                    var fromDom = $("#snCartFixed");
                    fromDom.children().appendTo(targetDom);
                    fromDom.empty();
                    $(".g-cart-slide-wrapper").css({height:"auto"});
                });
            }
        };

        // 拉开购物车
        $("body").delegate("#J_cart_slide_arr", "click", function (event) {
            $("body").data("clickMinCartBottom", false);
            minCartSlideUp();
            event.stopPropagation();
        });

        // 收起购物车
        $(document).click(function () {
            if (cartFixedStatus == true && cartOpen == true) {
                minCartSlideDown();
            }
        });

        // 悬停显示小箭头
        $("body").delegate(".g-cart-bottom, .g-cart-list", "mouseover",function () {
            if (cartFixedStatus != true) {
                return false;
            }
            var wrapper = $(".g-cart-slide-wrapper");
            if (wrapper.height() == 0) {
                clearTimeout(ArrTimer);
                ArrTimer = setTimeout(function() {
                    minCartShowArr();
                }, 200);
            }
        }).delegate("#snCartFixed", "mouseleave",function () {
                if (cartOpen == true) {
                    return false;
                }
                clearTimeout(ArrTimer);
                ArrTimer = setTimeout(function() {
                    minCartHideArr();
                }, 200);
            }).delegate("#snCartFixed, #snCartListWrapper", "click",function (event) {
                event.stopPropagation();
            }).delegate(".g-cart-bottom-num", "click", function(event){
                var wrapper = $(".g-cart-slide-wrapper");
                if( cartFixedStatus == true ){
                    if( cartOpen == true ){
                        minCartSlideDown();
                        return false;
                    }
                    // 点击底部黄色区域标识设为true
                    $("body").data("clickMinCartBottom", false);
                    minCartSlideUp();
                    event.stopPropagation();
                }
            }).delegate(".g-cart-list-bg", "mousewheel", function (event) {
                //return false;
            });


        // 根据屏幕滚动情况开启或关闭迷你购物车悬浮
        var scrollTimer = null;
        var windowHeight = $(window).height();
        var changePositionStatus = function(){
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                var minCartBottom = $("#myCart").offset().top + 35;
                var scrollTop = $(document).scrollTop();
                if (scrollTop > minCartBottom && cartFixedStatus == false) {  // 关闭可能已经打开的迷你购物车
                    cartWrapper.removeClass("g-min-cart-hover");
                    cartListBox.hide();
                    hideConfirm();
                    cartOpen = false;
                    cartLoadingStatus = false;
                }
                if (scrollTop > minCartBottom) { // 开
                    if( cartFixedStatus == false ){
                        minCartFixed();
                    }

                    // IE6开始悬浮
                    if(isIE6()){
                        snCartFixed.css({
                            bottom: "auto",
                            position: "absolute",
                            opacity: 1
                        });
                        var boxHeight = $(".g-min-cart-fixed").height() + 10;
                        var _winHeight = $(window).height();  //可视区域高度
                        var _newTop = scrollTop + _winHeight - boxHeight ;  // 悬浮购物车的top值
                        snCartFixed.stop().animate({top: _newTop});
                    }

                } else {  // 关闭
                    if( cartFixedStatus == true ){
                        minCartStatic();
                    }
                }
            }, 10);
        };

        // 性能优化直接屏蔽 2014-08-06
        /*$(window).scroll(function(){
            changePositionStatus();
        }).resize(function(){
            changePositionStatus();
        });*/

        // 未登录小耳朵交互
        $("body").delegate(".g-small-cartbtn", "mouseover", function(){
            var _btn = $(this);
            var _text = _btn.find(".g-small-cart-text");
            if(_btn.hasClass("J_cartbtn_width")){
                return false;
            }
            _btn.stop().animate({width:168}, 200, function(){
                _btn.addClass("J_cartbtn_width");
                _text.html('登&nbsp;&nbsp;&nbsp;&nbsp;录');
            });
        }).delegate(".g-small-cartbtn", "mouseleave", function(){
                var _btn = $(this);
                var _text = _btn.find(".g-small-cart-text");
                if(!_btn.hasClass("J_cartbtn_width")){
                    return false;
                }
                _btn.stop().animate({width:144}, 200, function(){
                    _btn.removeClass("J_cartbtn_width");
                    _text.html('购物车');
                });
            });

    };

    /*************************************** 2014-04 迷你购物车 ]] ***********************************/

    // 全部分类展开
    var next = false;
    var firstMoveIn = true;
    var trail = function () {
        var dataReady = false;
        var category = $('#category');
        var subCategory = $('#subCategory');
        var subCategoryMask = $('#subCategoryMask');
        var hook = $(".all-hook");
        var icon = $("#allSort_drop_icon");
        var isHome = category.is(":visible");
        var showSubMenu = function (index) {
            var target = "";
            if (isHome) {
                target = ' target="_blank" ';
            }
            if (dataReady && typeof publicCategoryOpenData != "undefined" && typeof publicCategoryOpenData[index] != "undefined") {
                // 拼接数据为html片段
                var cityId = d("cityId") || "9173";
                var data = publicCategoryOpenData[index];
                var html = "";
                if (isIE6()) {
                    html += '<iframe class="category-open-mask"' + iframeHttpsSrc + '></iframe>';
                }
                html += '<div class="sub-category">';
                if (typeof data.sub != "undefined") {
                    for (var i = 0; i < data.sub.length; i++) {
                        var subData = data.sub[i];
                        var split = subData.t[1].match(/cityId=.*&/gi) == null ? "" : "&";
                        html += i == 0 ? '<dl class="sc01">' : '<dl>';
                        if (subData.t[1] != "") {
                            var thisLinkRedDom = subData.t[3] == "orange" ? ' class="g-hot-link" ' : "";
                            html += '<dt><a ' + thisLinkRedDom + ' onclick="SFE.base.replaceCityPlaceHolder(this);" ' + target + '  href="' + subData.t[1].replace(/cityId=.*?&|cityId=.*$/gi, "cityId=" + cityId + split) + '" name="' + subData.t[2] + '" id="' + subData.t[3] + '">' + subData.t[0] + '</a></dt>';
                        } else {
                            html += '<dt>' + subData.t[0] + '</dt>';
                        }
                        html += '<dd>';
                        for (var j = 0; j < subData.s.length; j++) {
                            var aData = subData.s[j];
                            var split = aData[1].match(/cityId=.*&/gi) == null ? "" : "&";
                            var thisLinkRedDom = aData[3] == "orange" ? ' class="g-hot-link" ' : "";
                            html += '<a ' + thisLinkRedDom + ' onclick="SFE.base.replaceCityPlaceHolder(this);" ' + target + '  href="' + aData[1].replace(/cityId=.*?&|cityId=.*$/gi, "cityId=" + cityId + split) + '" name="' + aData[2] + '">' + aData[0] + '</a>';
                        }
                        html += '</dd>';
                        html += '</dl>';
                    }
                }
                html += '</div>';
                html += '<div class="sub-brands">';
                var hasBrandText = typeof data.brandText != "undefined" && data.brandText.length > 0;
                var hasBrandPic = typeof data.brandPic != "undefined" && data.brandPic.length > 0;
                var brandTitle = typeof data.brandTitle != "undefined" ? data.brandTitle : "推荐品牌";
                if (hasBrandText) {
                    html += '<dl><dt>' + brandTitle + '</dt><dd>';
                    for (var i = 0; i < Math.min(data.brandText.length, 10); i++) {
                        var aData = data.brandText[i];
                        var tagDom = typeof aData[3] != "undefined" ? '<em class="' + aData[3] + '"></em>' : ''; // 标签DOM
                        html += '<span><a ' + target + ' href="' + aData[1] + '" name="' + aData[2] + '">' + aData[0] + '</a>' + tagDom + '</span>';
                    }
                    html += '</dd></dl>';
                } else if (hasBrandPic) {
                    html += '<dl><dt>' + brandTitle + '</dt><dd class="g-brand-logo">';
                    for (var i = 0; i < Math.min(data.brandPic.length, 6); i++) {
                        var aData = data.brandPic[i];
                        html += '<span><a ' + target + ' href="' + aData[2] + '" name="' + aData[3] + '"><img src="' + aData[1] + '" alt="' + aData[0] + '" /></a></span>';
                    }
                    html += '</dd></dl>';
                }
                if (typeof data.pic != "undefined") {
                    var aData = data.pic[0];
                    html += '<div class="category-promotions-big"><a ' + target + ' href="' + aData[2] + '" name="' + aData[3] + '"><img src="' + aData[1] + '" alt="' + aData[0] + '" /></a></div>';
                }

                html += '</div>';
                html += '<a href="javascript:void(0);" title="关闭" class="close"></a>';
                var subCategoryWidth = 700;
                subCategory.html(html).show().css({width:0});
                if(firstMoveIn){
                    subCategory.animate({width:subCategoryWidth}, 200);
                }else{
                    subCategory.css({width:subCategoryWidth});
                }
                subCategoryMask.show();
                firstMoveIn = false;
            }
        };

        // 加载三级分类数据
        if (category.size() > 0) {
            $.ajax({
                url: httpType + "://" + sn.domain + sn.context + "/threeSort_10052_10051_.html",
                dataType: "script",
                cache:true,
                success: function(){dataReady = true;}
            });
        }
        if (!isHome) {
            category.hide();
            icon.show();
            // 非首页展开二级分类
            var timer;
            hook.hover(function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    category.show();
                    subCategory.hide();
                    subCategoryMask.hide();
                    category.children().removeClass("hover");
                    firstMoveIn = true;
                }, 200);
            }, function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    category.hide();
                    subCategory.hide();
                    subCategoryMask.hide();
                    category.children().removeClass("hover");
                    firstMoveIn = true;
                }, 100);
            });
            category.hover(function () {
                clearTimeout(timer);
            }, function () {
                timer = setTimeout(function () {
                    category.hide();
                    category.children().removeClass("hover");
                    subCategory.hide();
                    subCategoryMask.hide();
                    firstMoveIn = true;
                }, 60);
            });
            subCategory.hover(function () {
                clearTimeout(timer);
            }, function () {
                timer = setTimeout(function () {
                    category.hide();
                    category.children().removeClass("hover");
                    subCategory.hide();
                    subCategoryMask.hide();
                    firstMoveIn = true;
                }, 300);
            });
            subCategoryMask.hover(function () {
                clearTimeout(timer);
            }, function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    subCategory.hide();
                    subCategoryMask.hide();
                    category.children().removeClass("hover");
                    firstMoveIn = true;
                }, 300);
            });
        } else {
            //icon.hide();
            category.hover(function () {
                clearTimeout(timer);
            }, function () {
                timer = setTimeout(function () {
                    subCategory.hide();
                    subCategoryMask.hide();
                    category.children().removeClass("hover");
                    firstMoveIn = true;
                }, 100);
            });
            subCategory.hover(function () {
                clearTimeout(timer);
            }, function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    subCategory.hide();
                    subCategoryMask.hide();
                    category.children().removeClass("hover");
                    firstMoveIn = true;
                }, 300);
            });
            subCategoryMask.hover(function () {
                clearTimeout(timer);
            }, function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    subCategory.hide();
                    subCategoryMask.hide();
                    category.children().removeClass("hover");
                    firstMoveIn = true;
                }, 300);
            });
        }
        category.find("dl").mouseover(function () {
            var _this = $(this);
            var index = _this.index();
            if (isIE6()) {
                index -= 1;
            }
            var dl = category.children("dl");
            clearTimeout(timer);
            timer = setTimeout(function () {
                showSubMenu(index);
                dl.removeClass("hover").eq(index).addClass("hover");
                // 插入左侧竖线
                if( dl.eq(index).find(".g-category-line").size() == 0 ){
                    dl.eq(index).append('<dd class="g-category-line"></dd>');
                }
            }, 60);
        }).mouseleave(function () {
                clearTimeout(timer);
            });
        subCategory.delegate(".close", "click", function () {
            subCategory.hide();
            subCategoryMask.hide();
        });

    };

    function com(d1, d2, d3, d4) {
        var a1 = rotation(d1, d2);
        var a2 = rotation(d1, d3);
        var a3 = rotation(d1, d4);
        if (a1 < a2) {
            if (a3 >= a1 && a3 <= a2) {
                return true
            } else {
                return false;
            }
        } else {
            if (a3 >= a2 && a3 <= a1) {
                return true
            } else {
                return false;
            }
        }

    }

    function rotation(d1, d2) {
        return Math.atan2(d2[1] - d1[1], d2[0] - d1[0]) * 180 / Math.PI;
    }

    // 工具条方法打包
    var toolBarEvent = function(){
        appDowndloadCode();
        toolBarWelcome();
        //levelTips();
        toolBarOpen();
        setCityUrl();
        //加载待评价数量
         $(".tool-link").eq(0).find("dl.child-node").mouseover(function (e){
             appraiseCount();
         });
        //绑定二级目录点击替换cityId
        //setSearchCity("#category a");
    };

    // 搜索框方法打包
    var searchEvent = function(){
        getSearchKeyword();
        searchInputEvent();
        searchAutoComplete();
    };

    // 导航条方法打包
    var mainNavEvent = function(){
        trail();
        //openCart();  // 老的迷你购物车交互方法
        minCartEvent();  // 2014-03-25 添加的新购物车交互方法
    };

    // 回到顶部
    var gotop = function(){
        $("html,body").scrollTop(0);
    };

    // 浮动条
    var floatBar = function () {

        //默认参数
        var _d = {
            contents: null,             //滚动条的内容，可以是DOM字符或者jQuery对象
            align: "right",             //水平方向对齐
            vertical: "middle",         //垂直方向对齐
            zIndex: 7500,                //Z轴值
            css: {},                   //附加样式
            id: null,                    //包裹容器的id，必要时可以设置id用来操作DOM
            ieFixed: true               //IE6及更低版本是否模拟fixed效果
        };

        //检测某些垃圾浏览器版本，并保存至变量
        var _ie = ($.browser.msie) ? parseInt($.browser.version) : false;

        //检测并合并传递的参数
        if (arguments.length < 1 || !(arguments[0] instanceof Object)) {
            return $.error("ECode.floatBar: 参数必须为JSON对象");
        }
        $.extend(_d, arguments[0]);

        //挂载DOM
        var _hideCss = {
            position: "fixed",
            top: "-9999em",
            left: "-9999em"
        };
        if (_ie && _ie <= 6) {
            _hideCss.position = "absolute";
        }
        $('<div class="ECode-floatBar"></div>').css(_hideCss).appendTo("body");

        //修正位置
        var _bar = $("body").find(".ECode-floatBar:last");
        _bar.append(_d.contents);
        var _bw = _bar.width(),
            _bh = _bar.height(),
            _css = {zIndex: _d.zIndex};
        if (_d.id != null) {
            _bar.attr("id", _d.id);
        }
        switch (_d.align) {
            case 'right':
                _css.left = 'auto';
                _css.right = 0;
                break;
            case 'left':
                _css.right = 'auto';
                _css.left = 0;
                break;
            case 'center':
                _css.right = 'auto';
                _css.left = '50%';
                _css.marginLeft = -_bw / 2;
                break;
        }
        switch (_d.vertical) {
            case 'top':
                _css.top = 0;
                break;
            case 'bottom':
                _css.top = 'auto';
                _css.bottom = 0;
                break;
            case 'middle':
                _css.top = '50%';
                _css.marginTop = -_bh / 2;
                if (_ie && _ie <= 6) {
                    _css.marginTop = 0;
                }
                break;
        }
        _bar.css($.extend(_css, _d.css));

        /*
         * 以下代码针对IE6及更古老的版本
         * 如果感觉不爽，可以将 _d.ieFixed 置为 false
         * 那么IE6下将不会随屏滚动，囧~~
         * */
        var fixIE6 = function () {
            var _topHide = $(document).scrollTop(),  //页面上部被卷去高度
                _winHeight = $(window).height(),  //可视区域高度
                _winWidth = $(document).width();  //可视区域宽度
            switch (_d.vertical) {
                case 'top':
                    _bar.stop().animate({top: _topHide});
                    break;
                case 'bottom':
                    var _newTop = _winHeight + _topHide - _bh;
                    if (typeof _d.css.marginBottom != "undefined" && _d.css.marginBottom != null) {
                        var _mb = parseInt(_d.css.marginBottom);
                        //若果IE6下出现 margin-bottom 为负值，则忽略掉，否则合并计算得出 top 值
                        if (_mb >= 0) {
                            _newTop -= _mb;
                        }
                    }
                    _bar.css({marginTop: 0}).stop().animate({top: _newTop});
                    break;
                case 'middle':
                    _bar.stop().animate({top: _winHeight / 2 + _topHide - _bh / 2});
                    break;
            }
        };
        if (_d.ieFixed && _ie && _ie <= 6) {
            fixIE6();
            $(window).scroll(function () {
                fixIE6();
            });
            $(window).resize(function () {
                fixIE6();
            });
        }
    };

    var getCity = function(callBack) {
        var cityId = d('cityId');
        var sn_city = d('SN_CITY');
        if (cityId) {
            if(typeof callBack == "function"){
                callBack(cityId);
            }
        } else if (sn_city) {
            var city = analyzeCookie(sn_city);
            if(typeof callBack == "function"){
                callBack(city.cityCommerceId);
            }
        } else {
            var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
            var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
            var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
            var _hostName = document.location.hostname;
                
            var ipservice = "http://ipservice.suning.com";
            if (ego_pre.test(_hostName)) {
                ipservice = "http://ipservicepre.cnsuning.com";
            } else if (ego_sit.test(_hostName)) {
                ipservice = "http://ipservicesit.cnsuning.com";
            } else if (ego_dev.test(_hostName)) {
                ipservice = "http://ipservicesit.cnsuning.com";
            }
            var url = ipservice + '/ipQuery.do';
            $.ajax( {
                type : "GET",
                url : url,
                cache : true,
                async : false,
                dataType : "jsonp",
                jsonpCallback : "cookieCallback",
                success : function(cookieJson) {
                    cityId = cookieJson.cityCommerceId;
                    cookieJson.flag = "2";
                    cookieJson.count = 0;
                    var cityStr = cityInfoToString(cookieJson);
                    SetCookie('SN_CITY', cityStr);
                    SetCookie('cityId', cookieJson.cityCommerceId);
                    SetCookie('districtId', cookieJson.districtCommerceId);
                    if(typeof callBack == "function"){
                        callBack(cityId);
                    }
                },
                error : function() {
                    cityId = '9173';
                    if(typeof callBack == "function"){
                        callBack(cityId);
                    }
                }
            });
        }
    };

    var analyzeCookie = function(cookieValue){
        var cityArrayTemp = cookieValue.split("|");
        var cityTemp = null;
        if(cityArrayTemp.length>0){
        var data = cityArrayTemp[0].split("_");//按照_分出各个部分
        cityTemp = {};
        cityTemp.provinceMDMId = data[0];
        cityTemp.provinceCommerceId = data[1];
        cityTemp.cityMDMId = data[2];
        cityTemp.cityCommerceId = data[3];
        cityTemp.districtMDMId = data[4];
        cityTemp.districtCommerceId = data[5];
        cityTemp.flag = data[6];
        cityTemp.count = data[7];
        }
        return cityTemp;
    };

    var cityInfoToString = function(cityValue){
        var cookieValueTemp = "";
        cookieValueTemp += cityValue.provinceMDMId;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.provinceCommerceId;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.cityMDMId;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.cityCommerceId;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.districtMDMId;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.districtCommerceId;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.flag;
        cookieValueTemp += "_";
        cookieValueTemp += cityValue.count;
        return cookieValueTemp;
    };
    
    function SetCookie(f, h) {
        var e = 365;
        var g = new Date;
        g.setTime(g.getTime() + e * 24 * 60 * 60 * 1000);
        document.cookie = f + "=" + escape(h) + ";path=/;domain=" + sn.cookieDomain + ";expires=" + g.toGMTString();
    };

    //返回方法供页面使用
    return {
        d : d,
        getCity: getCity,
        logonurl : logonurl,
        setSearchCity : setSearchCity,
        replaceCityParam : replaceCityParam,
        replaceCityPlaceHolder : replaceCityPlaceHolder,
        registerurl : registerurl,
        logoff : logoff,
        onlineService : onlineService,
        toolBarEvent: toolBarEvent,
        searchEvent: searchEvent,
        onSubmitSearch : onSubmitSearch,
        mainNavEvent : mainNavEvent,
        floatBar: floatBar,
        miniCartReload : miniCartReload,
        gotop : gotop
    };

})(jQuery);

function hrefLink(e) {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            window.location = e
        } else {
            var f = document.createElement("a");
            f.href = e;
            document.body.appendChild(f);
            if (/msie/i.test(navigator.userAgent.toLowerCase())) {
                f.click()
            } else {
                var d = document.createEvent("MouseEvent");
                d.initEvent("click", false, false);
                f.dispatchEvent(d)
            }
        }
    };
function d(b) {
    var a;
    return (a = document.cookie.match(RegExp("(^| )" + b + "=([^;]*)(;|$)"))) ? decodeURIComponent(a[2]
        .replace(/\+/g, "%20"))
        : null
};

$(function () {
    // 头部方法
    SFE.base.toolBarEvent();
    SFE.base.searchEvent();
    SFE.base.mainNavEvent();
    
    // 通用懒加载
    //$("img[src2]").Jlazyload({type: "image", placeholderClass: "err-product"});
    //通用cityId替换
     SFE.base.setSearchCity(".cityId_replace a");
     // SFE.base.floatBar({zIndex: 7500, contents: $("#snSideTools"), align: "right", vertical: "bottom", css: {"right": 55, marginBottom: 300}});//左悬浮
     $(window).scroll(function(){
        var topHide = $(document).scrollTop(); //页面上部被卷去高度
        var gotop = $("#gotop");
        if(topHide>20){
            gotop.show();
        }else{
            gotop.hide();
        }
      });
      
      // 头部热搜词点击统计 pangnate 20140901
    $(document).on("click", "#snKeywordNew a", function(){
        sa.click.sendDatasIndex(this);
    });
});
