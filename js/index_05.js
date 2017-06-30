/* 
* @Author: anchen
* @Date:   2017-06-28 22:04:41
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-28 22:06:31
*/

$(document).on("pagebeforecreate",function(){
    alert("pagebeforecreate");
});


$(document).on("pagecreate",function(){
    alert("pagecreate");
});


$(document).on("pageinit",function(){
    alert("pageinit");
});