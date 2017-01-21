// ==UserScript==
// @name         CFM - Signature limit detector
// @namespace    http://nl.cheese.formice.com/
// @version      0.1
// @description  Checks the width and height of a signature.
// @author       Jordynl
// @match        http://cheese.formice.com/forum/threads/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

Element.prototype.prependChild = function(child) { this.insertBefore(child, this.firstChild); };

$(document).ready(function(){
    var signatureContainer = document.getElementsByClassName('signature');
    for(var i=0;i<signatureContainer.length;i++) {
        var signature = signatureContainer[i].getElementsByTagName("aside")[0];
        var height = signature.offsetHeight;
        var width = signature.offsetWidth;
        if (height >= 260) {
            var alertMessage = document.createElement("div");
            var divider = document.createElement("div");
            divider.style.paddingBottom = "5px";
            alertMessage.style.backgroundColor = "#f2dede";
            alertMessage.style.backgroundRepeat = "repeat-x";
            alertMessage.innerHTML = "<b>Signature too large!</b> (Height: "+height+"px)";
            alertMessage.style.height = "15px";
            alertMessage.style.padding = "5px"
            alertMessage.style.textAlign = "center";
            alertMessage.style.color = "#a94442";
            alertMessage.style.border = "1px solid #ebccd1";
            alertMessage.style.borderRadius = "4px";
            signatureContainer[i].prependChild(divider);
            signatureContainer[i].prependChild(alertMessage);
            alert("Big sig detected.");
        }
    };
});