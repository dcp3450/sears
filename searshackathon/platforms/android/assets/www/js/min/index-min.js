function menuAction(e){var t=e.parentNode.parentNode;t.className="lowerScreen",t.setAttribute("style","overflow:hidden"),t.innerHTML=t.innerHTML+'<div id="cover" onclick="menuClose(this,testMe)"></div>'}function testMe(e){setTimeout(function(){e.setAttribute("style","")},600)}function menuClose(e,t){var n=e.parentNode;n.className="",e.remove(),t(n)}function triggerView(e){for(var e=e,t=document.getElementsByClassName("button-main"),n=0;n<t.length;++n){var o=t[n];o.className=o.className+" hide"}setTimeout(function(){expandView(e)},500)}function expandView(e){var t=e+"-expand",n=document.getElementById(t);n.className=n.className+" fullScreen",viewFadeOut(n)}function viewFadeOut(e){var t=e;console.log(e),setTimeout(function(){e.className=e.className+" reverse";for(var t=document.getElementsByClassName("button-main"),n=0;n<t.length;++n){var o=t[n];o.className="button-main"}},1e3)}function triggerPopup(e){document.getElementById("popup").className="show"}function closePopup(){document.getElementById("popup").className=""}function getUser(e){var t="";t=e&&""!=e?"http://dcp3451-test.apigee.net/mydeals/users?fields="+e:"http://dcp3451-test.apigee.net/mydeals/users",app.controller("userProfileController",["$scope","$http",function(e,n){n.get(t).success(function(t,n,o,a){e.fname=t.fname,e.lname=t.lname,e.fullname=function(){return e.fname+" "+e.lname},e.photo=t.picture,e.points=t.pt_total}).error(function(e,t,n,o){})}])}var app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){function e(){return!1}app.receivedEvent("deviceready"),nfc.addNdefListener(function(e){var t=e.tag,n=t.ndefMessage,o=nfc.bytesToHexString(t.id);alert(o);var a="app/searshack",s="You won a coupon!",i=ndef.mimeMediaRecord(a,nfc.stringToBytes(s));nfc.write([i],function(){alert("success")},function(e){alert("fail")})},function(){console.log("Waiting for NDEF tags")},function(e){console.log("Error adding NDEF listener "+JSON.stringify(e))}),nfc.addMimeTypeListener("app/searshack",function(e){console.log(e);var t=e.tag,n=t.ndefMessage,o=nfc.bytesToString(n[0].payload).substring(0),a=nfc.bytesToHexString(t.id);document.getElementById("nfc-value").innerHTML=o},function(){console.log("listening for MIME NDEF tags")},function(e){console.log("Error registering MIME NDEF listener "+e)}),document.addEventListener("backbutton",e,!1)},receivedEvent:function(e){}},addRippleEffect=function(e){var t=e.target;if("button"!==t.tagName.toLowerCase())return!1;var n=t.getBoundingClientRect(),o=t.querySelector(".ripple");o||(o=document.createElement("span"),o.className="ripple",o.style.height=o.style.width=Math.max(n.width,n.height)+"px",t.appendChild(o)),o.classList.remove("show");var a=e.pageY-n.top-o.offsetHeight/2-document.body.scrollTop,s=e.pageX-n.left-o.offsetWidth/2-document.body.scrollLeft;o.style.top=a+"px",o.style.left=s+"px",o.classList.add("show");for(var i=document.getElementsByClassName("expand-circle"),c=e.pageY/2-document.body.scrollTop,r=e.pageX/2-document.body.scrollLeft,l=0;l<i.length;++l){var d=i[l];d.style.top=e.pageY+"px",d.style.left=e.pageX+"px"}return!1};document.addEventListener("click",addRippleEffect,!1);var app=angular.module("mydeals",[]);getUser("fname,lname,picture,pt_total");