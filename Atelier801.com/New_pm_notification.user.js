// ==UserScript==
// @name         [A801] New private message notification
// @namespace    http://atelier801.com
// @version      0.1
// @description  Notification sytem for new private messages
// @author       Jordynl
// @match        atelier801.com/*
// @grant        none
// ==/UserScript==

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

(function() {
    'use strict';
    modalHandler();
})();

function getPMList() {
    var msgs;
    $.get('/conversations').then(function(conversationsPage) {
        var messages = [];
        var HTMLParser = new DOMParser();
        var page = HTMLParser.parseFromString(conversationsPage, "text/html");
        var xPath = '//*[@id="corps"]/div[2]/div/div/table/tbody/tr[1]/td[%s]/span/a';
        var conversationList = page.getElementsByClassName("row");
        for (var i = 0; i < conversationList.length; i++){
            var message = {};
            message.replies = conversationList[i].getElementsByClassName("nombre-messages")[0];
            if (message.replies.className.indexOf("nombre-messages-reponses") !== -1) {
                message.author = conversationList[i].getElementsByClassName("cadre-type-auteur-joueur")[0];
                message.url = conversationList[i].getElementsByClassName("lien-blanc")[0].getAttribute("href");
                message.title = conversationList[i].getElementsByClassName("lien-blanc")[0].childNodes[2].textContent.trim();
                messages.push(message);
                console.log("First check: "+messages.length);
                console.log("New message.");
            }
        }
        var msgs = messages;
    });
    return msgs;
}

function modalHandler () {
    var inboxCounter = getElementByXpath('//*[@id="barre_navigation"]/div/div[1]/div/ul[2]/li[2]');
    if (inboxCounter) {
        var modalToggle = false;
        var newMessages = [];
        var messagesElement = inboxCounter.getElementsByTagName("a")[0];
        var messages = messagesElement.innerHTML.split(" ")[0];
        var modal = document.createElement("div");
        var modalBody = document.createElement("div");
        var modalHeader = document.createElement("div");
        var modalCloseButton = document.createElement("a");
        var modalTable = document.createElement("table");
        modalTable.innerHTML = "<tr><td>Last reply</td><td>Title</td>";
        modal.className = "modal hide fade ltr in pm_notification";
        modal.id = "popup_filtrage_affichage";
        modalBody.className = "modal_body";
        modalBody.style.textAlign = "margin 0 auto";
        modalBody.style.paddingLeft = "50px";
        modalCloseButton.className = "close";
        modalCloseButton.setAttribute("data-dismiss", "modal");
        modalCloseButton.addEventListener('click', function() { modal.style.display = "none"; });
        modalCloseButton.innerHTML = "x";
        modalHeader.className = "modal-header";
        modalHeader.innerHTML = "<h3>You have unread messages ("+messages+")</h3>";
        modalHeader.style.color = "#eb1d51";
        //var messageList = getPMList();
        $.get('/conversations').then(function(conversationsPage) {
            var HTMLParser = new DOMParser();
            var page = HTMLParser.parseFromString(conversationsPage, "text/html");
            var conversationList = page.getElementsByClassName("row");
            for (var i = 0; i < conversationList.length; i++){
                var tr = document.createElement("tr");
                var message = [];
                message.replies = conversationList[i].getElementsByClassName("nombre-messages")[0];
                if (message.replies.className.indexOf("nombre-messages-reponses") !== -1) {
                    message.author = conversationList[i].getElementsByClassName("cadre-type-auteur-joueur")[0].childNodes[1].textContent;
                    message.authorProfile = conversationList[i].getElementsByClassName("cadre-type-auteur-joueur")[0].parentNode.getAttribute("href");
                    console.log(message.authorProfile);
                    message.url = conversationList[i].getElementsByClassName("lien-blanc")[0].getAttribute("href");
                    message.title = conversationList[i].getElementsByClassName("lien-blanc")[0].childNodes[2].textContent.trim();
                    tr.innerHTML = "<td style='width:140px;'><a href='"+message.authorProfile+"'><font color=''>"+message.author+"</font></a></td><a href='"+message.url+"'>"+message.title+"</td>";
                    modalTable.appendChild(tr);
                    modalToggle = true;
                }
            }
        });
        if (modalToggle===true) {
            modalHeader.prepend(modalCloseButton);
            modal.appendChild(modalHeader);
            modalBody.appendChild(modalTable);
            modal.appendChild(modalBody);
            document.body.append(modal);
            modal.style.display = "block";
        }
    }
}