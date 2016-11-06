// ==UserScript==
// @name         [A801] Staff badges
// @namespace    http://your.homepage/
// @version      0.1
// @description  Adds staff badges, showing ranks that are linked to the staff rank.
// @author       Jordynl
// @match        http://atelier801.com/topic?f=*
// @grant        none
// ==/UserScript==

var ranks = ["admin", "moderateur", "mapcrew", "sentinelle"];

var rankColor = [];
rankColor.admin = "#ff5860";
rankColor.moderateur = "#babd2f";
rankColor.sentinelle = "#2ecf73";
rankColor.mapcrew = "#2f7fcc";
rankColor.joueur = "#009d9d";

var staffRanks = [];
staffRanks.admin = ['moderateur', 'sentinelle', 'mapcrew'];
staffRanks.moderateur = ["mapcrew"];
staffRanks.mapcrew = [];
staffRanks.sentinelle = [];

$(document).ready(function(){
	for (var i in ranks) {
	  glowify(ranks[i]);
	}
});

function renameRank(rank) {
    if (rank == "admin") {
        return "Admin";
    }
    else if (rank == "moderateur") {
        return "Moderator";
    }
    else if (rank == "sentinelle") {
        return "Sentinel";
    }
    else if (rank == "mapcrew") {
        return "MapCrew";
    }
    else {
        return rank;
    }
}

function glowify(rank) {
	element = document.getElementsByClassName("cadre-type-auteur-"+ rank);
	for(var i=0;i<element.length;i++){
		var color = document.defaultView.getComputedStyle(element[i],null).color;
        var text = element[i].innerText;
        badgeBox = [];
        var badgeElement = document.createElement('span');
        badgeElement.innerHTML = "<br/>";
        badgeElement.style.textAlign = "center";
        badgeElement.style.maxLenght = "10px";
        if (staffRanks[rank]) {
            rankList = staffRanks[rank];
            var x = 0;
            rankList.forEach(function(value) {
                console.log(badgeBox.length);
                if (badgeBox.length == 2) {
                 badgeBox.push("<br/>");
                 x = 0;
                }
                badgeBox.push("<span style='display:inline-block;min-width:12px;font-size:11px;padding-right:500px;padding:2px;color:#FFFFFF;border-radius:2px;vertical-align:baseline;color: "+rankColor[value]+"'>"+renameRank(value)+"</span>");
                x = x + 1;
            });
        badgeElement.innerHTML = badgeElement.innerHTML + badgeBox.join(" ");
        element[i].appendChild(badgeElement);
        }
	}
}

