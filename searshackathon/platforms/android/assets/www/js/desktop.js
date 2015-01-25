function menuAction(e){
    var nodeContainer = e.parentNode.parentNode;
    nodeContainer.className = "lowerScreen";
    nodeContainer.setAttribute("style","overflow:hidden");
    nodeContainer.innerHTML = nodeContainer.innerHTML+'<div id="cover" onclick="menuClose(this,testMe)"></div>';
}

function testMe(e){
    setTimeout(function(){ e.setAttribute("style",""); }, 600);
}

function menuClose(e,callback) {
    var nodeContainer = e.parentNode;
    nodeContainer.className = "";
    e.remove();

    callback(nodeContainer);
}

function triggerView(view){
    var view = view;
//  fade out buttons text
    var buttons = document.getElementsByClassName('button-main');
    for (var i = 0; i < buttons.length; ++i) {
        var item = buttons[i];
        item.className = item.className + " hide";
    }
    setTimeout(function(){
        expandView(view);
    },500)
};

//function printMousePos(e) {
//    var cursorX = e.clientX;
//    var cursorY = e.clientY;
//    console.log("X: " + cursorX + " Y: " + cursorY);
//}
//
//document.addEventListener("click", printMousePos);

function expandView(target){
    var viewToExpand = document.getElementById("expand");
    viewToExpand.className = viewToExpand.className + " fullScreen";
    viewFadeOut(viewToExpand);
}

function viewFadeOut(view){
    var viewToFadeOut = view;
    setTimeout(function(){
        viewToFadeOut.className = viewToFadeOut.className + " reverse";
        var buttons = document.getElementsByClassName('button-main');
        for (var i = 0; i < buttons.length; ++i) {
            var item = buttons[i];
            item.className = "button-main";
        }

    },1000);
    setTimeout(function(){ viewToFadeOut.className = "expand-circle";}, 1400);
}
var addRippleEffect = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    var expandCircle = document.getElementsByClassName('expand-circle');
    var clickTop = e.pageY / 2 - document.body.scrollTop;
    var clickLeft = e.pageX / 2 - document.body.scrollLeft;
    for (var i = 0; i < expandCircle.length; ++i) {
        var item = expandCircle[i];
        item.style.top = e.pageY + 'px';
        item.style.left = e.pageX + 'px';
    }
    return false;
}

document.addEventListener('click', addRippleEffect, false);



function triggerPopup(type){
    document.getElementById('popup').className = "show";
}

function closePopup(){
    document.getElementById('popup').className = "";
}


//angular stuff only
function getUser(){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://dcp3451-test.apigee.net/mydeals/users', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        alert(data);
      } else {
        // We reached our target server, but it returned an error

      }
    };



    request.send();
}

getUser();
