function menuAction(e){
    e.parentNode.parentNode.className = "lowerScreen";
    e.parentNode.parentNode.innerHTML = e.parentNode.parentNode.innerHTML+'<div id="cover" onclick="menuClose(this)"></div>';
}

function menuClose(e) {
    e.parentNode.className = "";
    e.remove();
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
    var targetID = target + "-expand";
    var viewToExpand = document.getElementById(targetID);
    viewToExpand.className = viewToExpand.className + " fullScreen";
    viewFadeOut(viewToExpand);
}

function viewFadeOut(view){
    var viewToFadeOut = view;
    console.log(view);
    setTimeout(function(){
        view.className = view.className + " reverse";
        var buttons = document.getElementsByClassName('button-main');
        for (var i = 0; i < buttons.length; ++i) {
            var item = buttons[i];
            item.className = "button-main";
        }
    },1000)

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