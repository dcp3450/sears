function menuAction(e){
    e.parentNode.parentNode.className = "lowerScreen";
    e.parentNode.parentNode.innerHTML = e.parentNode.parentNode.innerHTML+'<div id="cover" onclick="menuClose(this)"></div>';
}

function menuClose(e) {
    e.parentNode.className = "";
    e.remove();
}