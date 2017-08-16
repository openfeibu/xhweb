 var wallet_pass = '';
 var token = window.localStorage.token;
 var payInfo;

 function walletPay(xhAraay) {
     payInfo = xhAraay;
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
     }, 1)
 }

 function payPay(xhAraay) {
     //支付宝支付
     var shop_id = xhAraay.shop_id,
         pay_id = xhAraay.pay_id,
         address_id = xhAraay.address_id,
         user_coupon_id = xhAraay.user_coupon_id;
     is_alipay(true)
     var alipay_info = {
         "token": token,
         "shop_id": shop_id,
         "pay_id": pay_id,
         "address_id": address_id
     }
     if (user_coupon_id) {
         alipay_info.user_coupon_id = user_coupon_id;
     }
     $.post(locahost + 'orderInfo/store', alipay_info, function(data) {
         if (data.code == 2001) {
             fb_alert(fb_error["2001"])
             window.location.href = "login.html";
             return;
         } else if (data.code == 200) {
             is_alipay(false)
             $("body").append(data.data)
             $("#alipaysubmit").submit();
         } else {
             is_alipay(false)
             fb_alert(data.detail)
         }
     })
 }
 $('body').on("touchstart", ".payNum li", function() {
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
         console.log(payInfo)
         var shop_id = payInfo.shop_id,
             pay_id = payInfo.pay_id,
             address_id = payInfo.address_id,
             user_coupon_id = payInfo.user_coupon_id;
         var alipay_info = {
             "token": token,
             "shop_id": shop_id,
             "pay_id": pay_id,
             "address_id": address_id,
             "pay_password": $.md5(wallet_pass)
         };
         if (user_coupon_id) {
             alipay_info.user_coupon_id = user_coupon_id;
         }
         $.post(locahost + '/orderInfo/store', alipay_info, function(data) {
             is_alipay(false);
             if (data.code == 2001) {
                 fb_alert(fb_error["2001"])
                 window.location.href = "login.html";
                 return;
             }
             if (data.code == 110) {
                 fb_alert(data.detail);
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
     } else {
         for (var j = 0, c = wallet_pass.length; j < c; j++) {
             $(".payPassVal span").eq(j).text("*");
         }
     }
 })
 $('body').on("click", ".payPass_close", closeWallet)

 function closeWallet() {
     $(".payPass").fadeOut(300);
     $(".payNum").removeClass("top");
     setTimeout(function() {
         $(".payPass").remove();
     }, 300)
 }
 //微信支付
 function wechatPay(xhAraay) {
     var shop_id = xhAraay.shop_id,
         pay_id = xhAraay.pay_id,
         address_id = xhAraay.address_id,
         user_coupon_id = xhAraay.user_coupon_id;
     is_alipay(true)
     var wechat_info = {
         "token": token,
         "shop_id": shop_id,
         "pay_id": pay_id,
         "address_id": address_id
     }
     if (user_coupon_id) {
         wechat_info.user_coupon_id = user_coupon_id;
     }
     if(is_weixn()){
         wechat_info.platform = 'wechat';
     }
     $.post(locahost + 'orderInfo/store', wechat_info, function(data) {
         if (data.code == 2001) {
             fb_alert(fb_error["2001"])
             window.location.href = "login.html";
             return;
         } else if (data.code == 200) {
             is_alipay(false)
             $("body").append(data.data)
             callpay(data.data)
             // $("#alipaysubmit").submit();
         } else {
             is_alipay(false)
             fb_alert(data.detail)
         }
     })

 }

 function jsApiCall(wechatJson) {
    console.log(wechatJson);
    console.log(JSON.stringify(wechatJson));
     WeixinJSBridge.invoke('getBrandWCPayRequest', wechatJson, function(res) {
         WeixinJSBridge.log(res.err_msg);
         alert(res.err_code + res.err_desc + res.err_msg);
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