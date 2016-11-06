// ==UserScript==
// @name         CFM - Quick Nav [Mod]
// @namespace    http://nl.cheese.formice.com/
// @version      0.1
// @description  Quick Nav
// @author       Jordynl
// @match        http://*.cheese.formice.com/forum/*
// @grant        none
// ==/UserScript==

var links = [
    ["left", "Rules", "http://cheese.formice.com/forum/pages/CFMRules/", "#D9B404"],
    ["right", "Signature limit: 970x260", "red"]
];


(function() {
    var moderatorBar = document.getElementById('moderatorBar');
    var pageWidth = moderatorBar.getElementsByClassName('pageWidth')[0];
    var pageContent = pageWidth.getElementsByClassName('pageContent')[0];
    var quickNav = document.createElement('div');
    var rightContainer = document.createElement('div');
    var leftContainer = document.createElement('div');
    rightContainer.style.cssFloat = "right";
    leftContainer.style.cssFloat = "left";
    links.forEach(function(value) {
        var linkElement = document.createElement("a");
        linkElement.class = "reportedItems modLink";
        if (value[2].indexOf('http://') >= 0) {
            linkElement.href = value[2];
            linkElement.style.color = value[3];
        }
        else {
        linkElement.style.color = value[2];
        }
        linkElement.text = value[1];
        if (value[0] == "left") {
            leftContainer.appendChild(linkElement);
        }
        else {
            rightContainer.appendChild(linkElement);
        }
    });
    console.log(quickNav);
    quickNav.appendChild(rightContainer);
    quickNav.appendChild(leftContainer);
    pageContent.appendChild(quickNav);
    console.log(pageContent);
})();

