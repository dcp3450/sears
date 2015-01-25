
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
    var currentPage = document.querySelectorAll('article.current')[0];
    var nextPage = document.getElementsByClassName(view);
    var menuCurrent = document.querySelectorAll('li.current')[0];
    var menuNext = document.querySelectorAll('li#'+view)[0];
    menuCurrent.classList.remove('current');
    menuNext.classList.add('current');
//  fade out buttons text
    var buttons = document.getElementsByClassName('button-main');
    for (var i = 0; i < buttons.length; ++i) {
        var item = buttons[i];
        item.className = item.className + " hide";
    }
    setTimeout(function(){
        expandView(view, nextPage,currentPage);
    },500);

};

function expandView(target,nextPage,currentPage){
    var viewToExpand = document.getElementById("expand");
    var currentPage = currentPage;
    var nextPage = nextPage
    viewToExpand.className = viewToExpand.className + " fullScreen";
    viewFadeOut(viewToExpand,nextPage,currentPage);
    var cover = document.getElementById('cover');
    menuClose(cover, testMe);

}

function viewFadeOut(view,nextPage,currentPage){
    var viewToFadeOut = view;
    var nextPage = nextPage
    var currentPage = currentPage;
    console.log(nextPage);
    nextPage = nextPage[0];
    console.log(nextPage);
    setTimeout(function(){
        viewToFadeOut.className = viewToFadeOut.className + " reverse";
        var buttons = document.getElementsByClassName('button-main');
        for (var i = 0; i < buttons.length; ++i) {
            var item = buttons[i];
            item.className = "button-main";
        }
        currentPage.classList.remove('current');
        currentPage.classList.add('off');
        nextPage.classList.remove('off');
        nextPage.className = nextPage.className + " current";
    },1000);
    setTimeout(function(){
        viewToFadeOut.className = "expand-circle";
    }, 1400);
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

setTimeout(function(){
    var start = document.querySelectorAll('body.start')[0];
    start.classList.remove('start');
    start.classList.add('started');
},4000);

/** SWIPE EVENTS **/
