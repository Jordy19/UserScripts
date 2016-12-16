// ==UserScript==
// @name         [NL Wikipedia] Persoonlijke navigatie
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Persoonlijke navigatie lijst.
// @author       Jordy19
// @match        https://nl.wikipedia.org/*
// @grant        none
// ==/UserScript==

var linkLijst = [];
linkLijst["Moderatie gereedschap"] = [
    ["https://nl.wikipedia.org/wiki/Speciaal:LegePagina/RTRC", "RT wijzigingen", "red"]
];
linkLijst["Moderatie gerelateerd"] = [
    ["https://nl.wikipedia.org/wiki/Categorie:Wikipedia:Nuweg", "Nu Weg", "blue"]
];
linkLijst["Overige links"] = [
        ["https://nl.wikipedia.org/wiki/Wikipedia:Vandalismebestrijding", "Vandalisme 101", "purple"]
];

(function() {
    'use strict';
    var browserPad = window.location.pathname;
    console.log(browserPad);
    navigatieLinks();
})();

function navigatieLinks() {
    linkLijst.forEach(function(item) {
        console.log(item);
    });
    var navigatieBlok = document.getElementById("mw-panel");
    var navigatiePortals = navigatieBlok.getElementsByClassName("portal");
    var portaal = document.createElement("div");
    var portaalLabel = document.createElement("h3");
    var portaalBody = document.createElement("div");
    var linksBlok = document.createElement("ul");
    portaal.className = "portal";
    portaal.id = "p-navigation";
    portaal.setAttribute("role", "navigation");
    portaal.setAttribute("aria-labelledby", "p-navigation-label");
    portaalLabel.id = "p-navigation-label";
    portaalLabel.innerHTML = "Persoonlijke links";
    portaalBody.className = "body";
    linkLijst.forEach(function(item) {
        var linkElement = document.createElement("li");
        var link = document.createElement("a");
        linkElement.id = item[0];
        link.href = item[0];
        link.innerHTML = item[1];
        link.style.color = item[2];
        linkElement.appendChild(link);
        linksBlok.appendChild(linkElement);
    });
    portaalBody.appendChild(linksBlok);
    portaal.appendChild(portaalLabel);
    portaal.appendChild(portaalBody);
    navigatiePortals[0].parentNode.insertBefore(portaal, navigatiePortals[1]);
}