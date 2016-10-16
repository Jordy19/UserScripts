// ==UserScript==
// @name        Atelier801 - Custom navigation menu
// @namespace   @Jordynl
// @include     http://atelier801.com/*
// @version     0.0.1
// @author      Jordynl
// @grant       none
// ==/UserScript==

var menu = {
    "NL Favorites": [
        ["Updates en richtlijnen", "http://atelier801.com/topic?f=6&t=314832&p=3", "sub"],
        ["Staff FAQ", "http://atelier801.com/topic?f=6&t=66171&p=10", "sub"],
        ["[Reacties] Updates & Aankondigingen", "http://atelier801.com/topic?f=6&t=314833&p=4"],
    ],
    "EN Favorites": [
        ["[News] Recent Changes, Updates and Announcements", "http://atelier801.com/topic?f=6&t=64551&p=10#m183", "sub"],
        ["Staff FAQ", "http://atelier801.com/topic?f=6&t=51414&p=87#m1740", "sub"],
        ["PokeLua", "http://atelier801.com/topic?f=6&t=779097"],
    ]
};

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

$(document).ready(function(){ 
    var menuContainer = getElementByXpath('//*[@id="barre_navigation"]/div/div[1]/div/ul[1]');
    for (var button in menu) {
        var reportMenu = document.createElement('li');
        reportMenu.className ="dropdown";
        var reportButton = document.createElement('a');
        reportButton.href = "#";
        reportButton.innerHTML = button;
        reportButton.setAttribute("data-toggle", "dropdown");
        reportButtonCaret = document.createElement('b');
        reportButtonCaret.className = "caret";
        reportButtonCaret.style.borderTop = "4px solid #999";
        reportButton.appendChild(reportButtonCaret);
        reportMenu.appendChild(reportButton);
        var subMenu = document.createElement('ul');
        subMenu.className = "dropdown-menu menu-contextuel pull-left";
        menu[button].forEach(function(value) {
            var menuItemLi = document.createElement('li');
            var menuItem = document.createElement('a');
            menuItem.className = "element-menu-principal";
            if (value[2]) {
             menuItem.style.fontWeight = "bold";
            }
            menuItem.text = value[0];
            menuItem.href = value[1];
            menuItemLi.appendChild(menuItem);
            subMenu.appendChild(menuItemLi);
        });
        reportMenu.appendChild(subMenu);
        menuContainer.appendChild(reportMenu);
    }
});