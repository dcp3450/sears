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

}