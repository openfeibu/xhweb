$(function(){
 var wallet_pass = '';
 var app = window.localStorage.app;
 var token = window.localStorage.token;
 var payInfo;
 var payMap;
 var oldPass = '';
 function walletPay(xhAraay) {
     payInfo = xhAraay;
     payMap = payInfo.payMap;
     $(".payPassVal span").text("");
     wallet_pass = '';
     var payHtml = '<div class="payPass">\
                            <div class="payPassVal">\
                                <div class="payPass_close"></div>\
                                <div class="payPassVal_title">请输入钱包支付密码</div>\
                                <span></span>\
                                <span></span>\
                                <span></span>\
                                <span></span>\
                                <span></span>\
                                <span></span>\
                                <a href="'+webLoca+'wallet/mywallet.html#/passWord/forgetWalletPass" class="clearfix">忘记密码？</a>\
                            </div>\
                            <ul class="payNum">\
                                <li>1</li>\
                                <li>2</li>\
                                <li>3</li>\
                                <li>4</li>\
                                <li>5</li>\
                                <li>6</li>\
                                <li>7</li>\
                                <li>8</li>\
                                <li>9</li>\
                                <li></li>\
                                <li>0</li>\
                                <li></li>\
                            </ul>\
                        </div>';
     $('body').append(payHtml);
     setTimeout(function() {
         $(".payNum").addClass("top")
     }, 1);
 }

 $('body').on("touchstart", ".payPass li", function() {
     var i = $(this).index(".payNum li");
     var key;
     switch (i) {
         case 0:
             key = 1;
             break;
         case 1:
             key = 2;
             break;
         case 2:
             key = 3;
             break;
         case 3:
             key = 4;
             break;
         case 4:
             key = 5;
             break;
         case 5:
             key = 6;
             break;
         case 6:
             key = 7;
             break;
         case 7:
             key = 8;
             break;
         case 8:
             key = 9;
             break;
         case 9:
             return;
         case 10:
             key = 0;
             break;
         case 11:
             key = 11;
             break;
     }
     if (key == 11) {
         //删除键
         wallet_pass = wallet_pass.substr(0, wallet_pass.length - 1);
         $(".payPassVal span").text("")
         for (var j = 0, c = wallet_pass.length; j < c; j++) {
             $(".payPassVal span").eq(j).text("*")
         }
         return;
     }  
     wallet_pass += key;
     if (wallet_pass.length == 6) {
         closeWallet();
         //满6位 执行支付
         $(".payPassVal span").text("*");
         is_alipay(true)
         var alipay_info = payInfo;
         alipay_info.pay_password = $.md5(wallet_pass);
         alipay_info.token = token;
         if(payMap == 'work'){
            $.post(locahost + 'order/createOrder',alipay_info, function(data) {
                 is_alipay(false);
                 if (data.code == 2001) {
                     fb_alert(fb_error["2001"])
                     window.location.href =  webLoca+"login.html";
                     return;
                 }
                 if (data.code == 110) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';
                     fb_alert(data.detail);
                 }
                 if (data.code == 3001) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                     locaGo("wallet/mywallet.html#/passWord");
                 }
                 if (data.code == 200) {
                     fb_alert(fb_error["s_004"]);
                     closePayPass();
                     locaGo("#/work/personal");

                 } else {
                     fb_alert(data.detail)
                 }
             }).error(function() {
                 fb_alert("服务器出小差啦")
             })
         }else if(payMap == 'shop'){
            $.post(locahost + 'orderInfo/store', alipay_info, function(data) {
                 is_alipay(false);
                 if (data.code == 2001) {
                     fb_alert(fb_error["2001"])
                     window.location.href =  webLoca+"login.html";
                     return;
                 }
                 if (data.code == 110) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                 }
                 if (data.code == 3001) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                     locaGo("wallet/mywallet.html#/passWord");
                 }
                 if (data.code == 200) {
                     fb_alert(fb_error["s_004"]);
                     // return false;
                     locaGo("shop/shop-paysucc.html?order_id=" + data.order_id);
                 } else {
                     fb_alert(data.detail)
                 }
             }).error(function() {
                 fb_alert("服务器出小差啦")
             })
         }else if(payMap == 'shopOrder'){
            $.post(locahost + 'orderInfo/pay', alipay_info, function(data) {
                 is_alipay(false);
                 if (data.code == 2001) {
                     fb_alert(fb_error["2001"])
                     window.location.href =  webLoca+"login.html";
                     return;
                 }
                 if (data.code == 110) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                 }
                 if (data.code == 3001) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                     locaGo("wallet/mywallet.html#/passWord");
                 }
                 if (data.code == 200) {
                     fb_alert(fb_error["s_004"]);
                     
                     locaGo("shop/shop-paysucc.html?order_id=" + data.order_id);
                 } else {
                     fb_alert(data.detail)
                 }
             }).error(function() {
                 fb_alert("服务器出小差啦")
             })
         }else if(payMap == 'getmoney'){
            $.post(locahost + 'user/withdrawalsApply', alipay_info, function(data) {
                 is_alipay(false);
                 if (data.code == 2001) {
                     fb_alert(fb_error["2001"])
                     window.location.href =  webLoca+"login.html";
                     return;
                 }
                 if (data.code == 110) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                 }
                 if (data.code == 3001) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                     locaGo("wallet/mywallet.html#/passWord");
                 }
                 if (data.code == 200) {
                     fb_alert(fb_error["10"]);
                     closePayPass();
                     window.history.go(-1);
                     // locaGo("shop/shop-paysucc.html?order_id=" + data.order_id);
                 } else {
                     fb_alert(data.detail)
                 }
             }).error(function() {
                 fb_alert("服务器出小差啦")
             })
         }else if(payMap == 'completedOrder'){
            $.post(locahost + 'order/confirmFinishWork', alipay_info, function(data) {
                 is_alipay(false);
                    if (data.code == 2001) {
                    fb_alert(fb_error["2001"]);
                        window.location.href =  webLoca+"login.html";
                    }
                    if (data.code == 3001) {
                     $(".payPassVal span").text("");
                     wallet_pass = '';   
                     fb_alert(data.detail);
                     locaGo("wallet/mywallet.html#/passWord");
                     }
                    if (data.code == 200) {
                        fb_alert(fb_error["10"]);
                        window.location.reload();
                    } else {
                        $(".payPassVal span").text("");
                        wallet_pass = ''; 
                        fb_alert(data.detail);

                    }
             }).error(function() {

                 fb_alert("服务器出小差啦")
             })
         }else if(payMap == 'oldPass'){
            if(oldPass.length != 0 ){
                //有旧密码
                alipay_info.old_paypassword = oldPass;
                alipay_info.new_paypassword = $.md5(wallet_pass);
                $.post(locahost + 'user/changePayPassword', alipay_info, function(data) {
                         $('.payPassVal_title').text("请输入钱包支付密码");
                         is_alipay(false);
                        if (data.code == 2001) {
                        fb_alert(fb_error["2001"]);
                            window.location.href =  webLoca+"login.html";
                        }
                        if (data.code == 200) {
                            oldPass = '';
                            fb_alert(fb_error["1007"]);
                            closePayPass();
                            setTimeout(function(){
                                 window.history.go(-1);
                            },1000)

                        } else {
                            $(".payPassVal span").text("");
                            wallet_pass = ''; 
                            oldPass = '';
                            fb_alert(data.detail);

                        }
                }).error(function() {

                     oldPass = '';
                    $(".payPassVal span").text("");
                    wallet_pass = '';
                     fb_alert("服务器出小差啦")
                    })
            }else{
                is_alipay(false);
                oldPass = $.md5(wallet_pass);
                closePayPass();
                 setTimeout(function(){
                    walletPay({payMap:"oldPass"});
                     $('.payPassVal_title').text("请输入新的钱包支付密码");
                 },500)
               
                
            }
            return wallet_pass;
           
            
         }else if(payMap == 'setPass'){
            if(oldPass.length != 0 ){
                //有旧密码
                alipay_info.old_paypassword = oldPass;
                alipay_info.new_paypassword = $.md5(wallet_pass);
                if(oldPass != $.md5(wallet_pass)){
                    is_alipay(false);
                    fb_alert(fb_error["1000"]);
                    oldPass = '';
                    $(".payPassVal span").text("");
                    wallet_pass = '';
                    return false;
                }
                $.post(locahost + 'user/setPayPassword', alipay_info, function(data) {
                         $('.payPassVal_title').text("请设置钱包支付密码");
                         is_alipay(false);
                        if (data.code == 2001) {
                        fb_alert(fb_error["2001"]);
                            window.location.href =  webLoca+"login.html";
                        }
                        if (data.code == 200) {
                            oldPass = '';
                            fb_alert(fb_error["1001"]);
                            closePayPass();
                            window.localStorage.is_paypassword = 1
                            setTimeout(function(){
                                 window.history.go(-1);
                            },1000)
                        } else {
                            $(".payPassVal span").text("");
                            wallet_pass = ''; 
                            oldPass = '';
                            fb_alert(data.detail);

                        }
                }).error(function() {
                     oldPass = '';
                    $(".payPassVal span").text("");
                    wallet_pass = '';
                     fb_alert("服务器出小差啦")
                    })
            }else{
                is_alipay(false);
                oldPass = $.md5(wallet_pass);
                closePayPass();
                 setTimeout(function(){
                    walletPay({payMap:"setPass"});
                     $('.payPassVal_title').text("请再输入钱包支付密码");
                 },500)
               
                
            }
            return wallet_pass;
         }else{
                is_alipay(false);
                fb_alert("未找到支付类型")
         }
     } else {
         for (var j = 0, c = wallet_pass.length; j < c; j++) {
             $(".payPassVal span").eq(j).text("*");
         }
     }
 })


     //支付宝支付
 function payPay(xhAraay) {
    is_alipay(true)
    var alipay_info = xhAraay;
        alipay_info.token = token; 
    payMap = xhAraay.payMap;
    if(payMap == 'work'){
        $.post(locahost+'order/createOrder',alipay_info, function(data){
            if(data.code == 2001){
                fb_alert(fb_error["2001"])
                window.location.href =  webLoca+"login.html";
                return;
            }else if(data.code == 200){
                     is_alipay(false)
                    $("body").append(data.data);
                    $("#alipaysubmit").submit();
            }else{
                is_alipay(false)
               fb_alert(data.detail)
            }
        })
    }else if(payMap == 'shop'){
        $.post(locahost + 'orderInfo/store', alipay_info, function(data) {
             if (data.code == 2001) {
                 fb_alert(fb_error["2001"])
                 window.location.href =  webLoca+"login.html";
                 return;
             } else if (data.code == 200) {
                 is_alipay(false)
                 $("body").append(data.data);
                 $("#alipaysubmit").submit();
             } else {
                 is_alipay(false);
                 fb_alert(data.detail);
                 window.location.href =  webLoca+"shop/shop-order.html?locahost=home#/waitpay";
             }
        })
    }else if(payMap == 'shopOrder'){
        $.post(locahost + 'orderInfo/pay', alipay_info, function(data) {
             if (data.code == 2001) {
                 fb_alert(fb_error["2001"])
                 window.location.href =  webLoca+"login.html";
                 return;
             } else if (data.code == 200) {
                 is_alipay(false)
                 $("body").append(data.data);
                 $("#alipaysubmit").submit();
             } else {
                 is_alipay(false)
                 fb_alert(data.detail)
             }
        })
    }
 }




 //微信支付
 function wechatPay(xhAraay) {
    is_alipay(true);
    var wechat_info = xhAraay;
    wechat_info.token = token; 
    payMap = xhAraay.payMap;
    wechat_info.platform = 'wechat';
    if(app){
         wechat_info.platform = 'and';
    }
    if(is_weixn()){
        wechat_info.platform = 'wechat';
    }
    if(payMap == 'work'){
        $.post(locahost + 'order/createOrder',wechat_info, function(data) {
             if (data.code == 2001) {
                 fb_alert(fb_error["2001"])
                 window.location.href = webLoca+"login.html";
                 return;
             } else if (data.code == 200) {
                 is_alipay(false)
                 callpay(data.data)
                 // $("#alipaysubmit").submit();
             } else {
                 is_alipay(false)
                 fb_alert(data.detail)
             }
         })
    }else if(payMap == 'shop'){
        $.post(locahost + 'orderInfo/store', wechat_info, function(data) {
             if (data.code == 2001) {
                 fb_alert(fb_error["2001"])
                 window.location.href =  webLoca+"login.html";
                 return;
             } else if (data.code == 200) {
                 is_alipay(false)
                 if(app){
                    window.feibu.wechatPay(JSON.stringify(data))
                }else{
                    callpay(data.data) 
                }
                 // $("#alipaysubmit").submit();
             } else {
                 is_alipay(false)
                 fb_alert(data.detail);

             }
         })
    }else if(payMap == 'shopOrder'){
        $.post(locahost + 'orderInfo/pay', wechat_info, function(data) {
             if (data.code == 2001) {
                 fb_alert(fb_error["2001"])
                 window.location.href =  webLoca+"login.html";
                 return;
             } else if (data.code == 200) {
                 is_alipay(false)
                 if(app){
                    window.feibu.wechatPay(JSON.stringify(data))
                }else{
                  callpay(data.data) 
                }
                 // $("#alipaysubmit").submit();
             } else {
                 is_alipay(false)
                 fb_alert(data.detail)
             }
         })
    }
     

 }

 function jsApiCall(wechatJson) {
     WeixinJSBridge.invoke('getBrandWCPayRequest',JSON.parse(wechatJson), function(res) {
         if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
            //支付成功
            window.location.href=webLoca+'shop/shop-paysucc.html'
         }else if(res.err_msg== "get_brand_wcpay_request:cancel"){
             fb_alert("你已取消微信支付");
             window.location.href =  webLoca+"shop/shop-order.html?locahost=home#/waitpay";
         }else if(res.err_msg== "get_brand_wcpay_request:fail"){
            fb_alert("支付失败");
            window.location.href =  webLoca+"shop/shop-order.html?locahost=home#/waitpay";
         }
     });
 }

 function callpay(wechatJson) {
     if (typeof WeixinJSBridge == "undefined") {
         if (document.addEventListener) {
             document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
         } else if (document.attachEvent) { 
             document.attachEvent('WeixinJSBridgeReady', jsApiCall);
             document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
         }
     } else {
         jsApiCall(wechatJson);
     }
 }
 

 //打开支付框
 function getPayInfo(count){
    var app = window.localStorage.app;
     if($(".shop-pay-box").length == 0){
                var pay_html_box = '<div class="shop-pay-box ">\
                                        <div class="shop-pay animate">\
                                            <div class="shop-pay-header">\
                                              <p class="fl">需要支付： <span data-name="count">'+count+'元</span></p>\
                                              <div class="shop-pay-close fr">取消</div>\
                                            </div>\
                                            <dl>\
                                            </dl>\
                                            <div class="paySubmit">确认支付</div>\
                                        </div>\
                                    </div>';
                $("body").append(pay_html_box)
            }
     $.getJSON(locahost+'user/getWallet',{token:token},function(data){
           if(data.code == 200){
             window.localStorage.wallet_number = data.data.wallet;
                  $.getJSON(locahost+'pay',function(data){
                   if(data.code == 200){
                        is_alipay(false)
                        var pay_html = '<dt>请选择支付方式：</dt>';
                          $.each(data.data,function(a,b){
                              if(b.pay_name== 'alipay' && !is_weixn()){
                                //支付宝支付
                                pay_html += '<dd class="alipay-icon">\
                                              <p class="fl">'+b.description+'</p>\
                                              <input class="fr" type="radio" value="'+a+'"  name="payType"/>\
                                            </dd>';
                              }else if(b.pay_name == 'wechat' && (is_weixn() || app ) ){
                                //微信支付
                                pay_html += '<dd class="wechat-icon">\
                                              <p class="fl">'+b.description+'</span></p>\
                                              <input class="fr" type="radio" value="'+a+'"  name="payType"/>\
                                            </dd>';
                              }else if(b.pay_name== 'wallet'){
                                var wallet_number = window.localStorage.wallet_number;
                                var total_fee = count;
                                //钱包支付
                                if(parseFloat(wallet_number) < parseFloat(total_fee)){
                                  //余额不够
                                  pay_html += '<dd class="wallet-icon">\
                                              <p class="fl">'+b.description+'<span>（剩余￥'+wallet_number+'元,余额不足）</span></p>\
                                              <input class="fr" type="radio" value="'+a+'" disabled="disabled" name="payType"/>\
                                          </dd>';
                                }else{
                                   pay_html += '<dd class="wallet-icon">\
                                              <p class="fl">'+b.description+'<span>（剩余￥'+wallet_number+'元）</span></p>\
                                              <input class="fr" type="radio" value="'+a+'" name="payType"/>\
                                          </dd>';
                                }
                              }
                             
                          })

                        $(".shop-pay dl").html(pay_html)
                        $(".shop-pay-box").show();
                        setTimeout(function(){
                            $(".shop-pay").css("bottom",0);
                        },50)
                    }else{
                       fb_alert(data.detail);
                    } 
                 })
           }else{
            fb_alert(data.detail)
           }

     })
 }

 $('body').on("click", ".shop-pay-close", closeWallet)
 function closeWallet() {
    $(".shop-pay-box").fadeOut(500)
    $(".shop-pay").css("bottom",-$(".shop-pay").outerHeight(true));
 }
 $('body').on("click", ".payPass_close", closePayPass)
 function closePayPass() {
     $(".payPass").fadeOut(300);
     $(".payNum").removeClass("top");
     setTimeout(function() {
         $(".payPass").remove();
     }, 300)
 }

 window.walletPay = walletPay;
 window.payPay = payPay;
 window.wechatPay = wechatPay;
 window.getPayInfo = getPayInfo;
 window.closePayPass = closePayPass;
})