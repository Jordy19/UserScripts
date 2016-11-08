// ==UserScript==
// @name        Atelier801 Glowing staff names
// @namespace   @Jordynl
// @include     http://atelier801.com/*
// @include     http://www.atelier801.com/*//
// @version     1
// @author      Jordynl
// @grant       none
// ==/UserScript==

var ranks = ["admin", "moderateur", "mapcrew", "sentinelle"];

$(document).ready(function(){
    setTimeout(function(){
	    for (var i in ranks) {
	      glowify(ranks[i]);
	    }
    }, 2000);
});

function glowify(rank) {
    var element = document.getElementsByClassName("cadre-type-auteur-"+ rank)
    for(var i=0;i<element.length;i++){
        var color = document.defaultView.getComputedStyle(element[i],null)["color"];
        element[i].style.textShadow = "0 0 10px "+color;
    }
}

