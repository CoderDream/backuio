/* 
* @Author: anchen
* @Date:   2017-06-28 22:04:41
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-28 22:13:10
*/

$(document).on("pagebeforehide","#index",function(){
    alert("pagebeforehide");
});

$(document).on("pagehide","#index",function(){
    alert("pagehide");
});

$(document).on("pagebeforeshow","#index2",function(){
    alert("pagebeforeshow");
});

$(document).on("pageshow","#index2",function(){
    alert("pageshow");
});