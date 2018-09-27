// ==UserScript==
// @name         [BC] Search filter
// @namespace    http://github.com/jordy19
// @version      0.1
// @description  Filter the nonsense threads.
// @author       Jordy19
// @match        https://www.bleepingcomputer.com/forums/index.php?app=core&module=search&do=viewNewContent&search_app=forums
// @grant        none
// ==/UserScript==

var filterBoards = ["Forum Games"];

(function() {
    'use strict';
    var filterList = [];
    var forumTable = document.getElementById("forum_table");
    var forumThreads = forumTable.getElementsByClassName("_recordRow");
    for (var i=0; i < forumThreads.length; i++) {
        var threadInfo = forumThreads[i].getElementsByClassName("desc");
        var boardElement = threadInfo[0];
        var boardTitle = boardElement.innerText.substring(3);
        var threadTitle = forumThreads[i].getElementsByTagName("a")[1];
        console.log(boardTitle);
        if (filterBoards.indexOf(boardTitle) > -1) {
            console.log(forumThreads[i]);
            threadTitle.style.color = "#b4a5a5";
            filterList.push(forumThreads[i]);
        }
    }
        for(var threadIndex1=0;threadIndex1<filterList.length;threadIndex1++) {
        forumTable.appendChild(filterList[threadIndex1]);
    }
})();