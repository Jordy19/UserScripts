// ==UserScript==
// @name         [a801] Whitespace in BBCode quote tags.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jordynl
// @match        http://atelier801.com/topic?f=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var quoteElements = document.getElementsByClassName("cadre-quote");
    for(var index=0;index<quoteElements.length;index++) {
        quoteElements[index].style.whiteSpace = "pre-wrap";
    }
})();